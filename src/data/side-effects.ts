/* eslint-disable functional/no-expression-statement, functional/no-try-statement */

// WordPress dependencies
import { _x, sprintf } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

// External dependencies
import { filter, flatten, uniq } from 'lodash';

// Internal dependencies
// NOTE: This import should be replaced by WordPress’ data controls (when awaitPromise is available)
import { apiFetch, dispatch, select, awaitPromise } from './controls';
import type { Attachments, ImageAttachment, LogMessage } from './types';

import {
	ConversionRequest,
	ConversionResponse,
	ImportSettings,
	VirtualDom as VD,
} from '@nelio-unlocker/types';

// TYPES

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SideEffects = Generator< any, any, unknown >;

type ImageProps = {
	readonly width: number;
	readonly height: number;
	readonly mime: string;
};

export type PostType = {
	readonly rest_base: string; // eslint-disable-line camelcase
};

// CONSTANTS

const STORE = 'nelio-unlocker-importer/data';
const UNKNOWN_ERROR = _x( 'Unknown error occurred.', 'text', 'nelio-unlocker' );
/* translators: file name */
const INVALID_FILE_ERROR = _x(
	'Invalid export file: “%s”. Please choose a different export file and try again.',
	'user',
	'nelio-unlocker'
);

// SIDE EFFECT FUNCTIONS

export function* uploadRequest( name: string, json?: string ): SideEffects {
	try {
		if ( ! json ) {
			yield dispatch( STORE, 'failFileUpload', UNKNOWN_ERROR );
			return;
		} //end if

		const request = JSON.parse( json ) as ConversionRequest;
		const isValid = ( yield isRequestValid( request ) ) as boolean;
		if ( ! isValid ) {
			const error = sprintf( INVALID_FILE_ERROR, name );
			yield dispatch( STORE, 'failFileUpload', error );
			return;
		} //end if

		const post = yield apiFetch( {
			path: addQueryArgs( '/nelio-unlocker/v2/posts/search', {
				url: request.settings.url || '',
			} ),
		} );

		const settings = post
			? { mode: 'overwrite' as const, post }
			: { mode: 'create' as const, post: { type: 'page', title: '' } };

		yield dispatch( STORE, 'initImportSettings', request, settings );
	} catch ( e ) {
		const error = sprintf( INVALID_FILE_ERROR, name );
		yield dispatch( STORE, 'failFileUpload', error );
	} //end try
} //end uploadRequest()

export function* convert(): SideEffects {
	yield dispatch( STORE, 'initConversion' );

	const settings = ( yield select(
		STORE,
		'getImportSettings'
	) ) as ImportSettings;

	yield log( _x( 'Converting page…', 'text', 'nelio-unlocker' ) );
	try {
		const request = ( yield getRequestAfterUploadingAttachments(
			settings
		) ) as ConversionRequest;

		const post = ( yield apiFetch( {
			path: '/nelio-unlocker/v2/convert',
			method: 'POST',
			data: {
				request,
				settings,
			},
		} ) ) as ConversionResponse;

		yield dispatch( STORE, 'setImportedPost', post );
		yield dispatch( STORE, 'endConversion' );
	} catch ( e ) {
		const error = e as Error;
		yield logError( error.message );
		yield dispatch( STORE, 'failConversion' );
	} //end try
} //end convert()

// HELPERS

function* isRequestValid( request: ConversionRequest ): SideEffects {
	if ( ! request.vdom || ! request.hash ) {
		return false;
	} //end if

	if ( ! request.settings || ! request.settings.builder ) {
		return false;
	} //end if

	try {
		const apiUrl = ( yield select( STORE, 'getApiUrl' ) ) as string;
		const response = ( yield apiFetch( {
			url: `${ apiUrl }/unlock/validate`,
			method: 'POST',
			credentials: 'omit',
			mode: 'cors',
			data: request,
		} ) ) as { readonly valid?: boolean };
		return !! response.valid;
	} catch ( e ) {
		return false;
	} //end try
} //end isRequestValid()

function* getRequestAfterUploadingAttachments(
	importSettings: ImportSettings
): SideEffects {
	const importedRequest = ( yield select(
		STORE,
		'getConversionRequest'
	) ) as ConversionRequest;

	const vdom = VD.unserialize(
		JSON.parse( importedRequest.vdom ) as VD.SerializedNode
	);
	const attachments = yield uploadImagesToMediaLibrary(
		vdom as VD.Node,
		importedRequest.settings.builder
	);

	const pluginVersion = ( yield select(
		STORE,
		'getPluginVersion'
	) ) as string;

	return {
		...importedRequest,
		settings: {
			...importedRequest.settings,
			pluginVersion,
			postType: importSettings.post.type,
			attachments: attachments as Attachments,
		},
	};
} //end getRequestAfterUploadingAttachments()

function* log( msg: LogMessage ): SideEffects {
	yield dispatch( STORE, 'addLogMessage', msg );
} //end log()

function* logError( msg: string ): SideEffects {
	yield dispatch( 'core/notices', 'createErrorNotice', msg );
} //end logError()

/* eslint-disable no-empty, functional/immutable-data, functional/no-let */
function* uploadImagesToMediaLibrary(
	vdom: VD.Node,
	builder: string
): unknown {
	yield log(
		_x( 'Uploading images to media library…', 'text', 'nelio-unlocker' )
	);

	const images: readonly string[] = uniq( getImages( vdom ) );
	const attachments = {} as Attachments;
	for ( const url of images ) {
		const { width, height, mime } = ( yield awaitPromise(
			getImageSize( url )
		) ) as ImageProps;
		let attachment: ImageAttachment = { id: 0, url };
		try {
			attachment = ( yield apiFetch( {
				path: '/nelio-unlocker/v2/media-library/image',
				method: 'PUT',
				data: { url, width, height, mime, builder },
			} ) ) as ImageAttachment;
		} catch ( e ) {} //end try
		attachments[ url ] = attachment;
	} //end for

	return attachments;
} //end uploadImagesToMediaLibrary()
/* eslint-enable no-empty, functional/immutable-data, functional/no-let */

function getImages( node: VD.Node ): readonly string[] {
	if ( VD.isText( node ) ) {
		return [] as readonly string[];
	} //end if

	const images = flatten( node.children.map( getImages ) );
	const image = VD.isImg( node ) && VD.getImageSrc( node );
	const background = VD.getBackgroundImage( node );

	return filter( [ image, background, ...images ] ) as readonly string[];
} //end getImages()

function getImageSize( url: string ): Promise< ImageProps > {
	const mime = /\.png$/.test( url.toLowerCase() )
		? 'image/png'
		: 'image/jpeg';

	/* eslint-disable functional/no-return-void, functional/immutable-data */
	return new Promise( ( resolve ): void => {
		const img = new Image();
		img.onload = (): void =>
			resolve( { width: img.width, height: img.height, mime } );
		img.onerror = (): void => resolve( { width: 1, height: 1, mime } );
		img.src = url;
	} );
	/* eslint-enable functional/no-return-void, functional/immutable-data */
} //end getImageSize()
