/* @jsx jsx */
/* eslint-disable functional/no-return-void */

// WordPress dependencies
import '@wordpress/core-data';

import apiFetch from '@wordpress/api-fetch';

import { useDispatch, useSelect } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import { _x, sprintf } from '@wordpress/i18n';
import {
	dateI18n,
	__experimentalGetSettings as getDateSettings,
} from '@wordpress/date';

// Nelio Unlocker dependencies
import {
	Post,
	usePost,
	useRestBase,
	useSupportsThumbnail,
	useTypeName,
	useUserName,
} from '@nelio-unlocker/hooks';

// External dependencies
import type { Ref } from 'react';
import { css, jsx } from '@emotion/react';

// Internal dependencies
import {
	AsyncSelectControl,
	AsyncSelectControlProps,
	AsyncSelectControlResult,
} from './async-select-control';

// TYPES

/* eslint-disable @typescript-eslint/no-explicit-any */

export type PostSearcherProps = Omit<
	AsyncSelectControlProps< Post >,
	'loadOptions' | 'getOptionLabel'
> & {
	readonly postType: string;
	readonly isDisabled?: boolean;
	readonly onChange: ( postId: number ) => void;
	readonly value: number;
};

type Media = {
	readonly source_url: string; // eslint-disable-line camelcase
};

type PostLoader = (
	search: string,
	prevOptions: readonly Post[],
	page: number
) => Promise< PostList >;

type PostList = AsyncSelectControlResult< Post >;

type PostCacher = ( posts: readonly Post[] ) => void;

type PostOption = ( props: PostOptionProps ) => JSX.Element | null;

type PostOptionProps = Record< string, any > & {
	readonly innerRef: Ref< any >;
	readonly isFocused: boolean;
	readonly isSelected: boolean;
};

type PaginatedResponse< T > = {
	readonly data: T;
	readonly totalPages: number;
};

declare module '@wordpress/date' {
	export const __experimentalGetSettings: () => {
		readonly formats: {
			readonly date: string;
		};
	};
}

/* eslint-enable @typescript-eslint/no-explicit-any */

// VIEWS

export const PostSearcher = ( {
	postType,
	isDisabled,
	onChange,
	value,
	...props
}: PostSearcherProps ): JSX.Element => {
	const isCacheReady = useIsCacheReady();
	const cachePosts = useCache( postType );
	const post = usePost( postType, value ) || null;
	const restBase = useRestBase( postType ) || '';

	return (
		<AsyncSelectControl< Post >
			cacheUniq={ postType }
			isDisabled={ isDisabled || ! isCacheReady || ! restBase }
			loadOptions={ getPostLoader( restBase, cachePosts ) }
			components={ { Option: getPostOption( postType ) } }
			onChange={ ( newPost ): void =>
				onChange( newPost ? newPost.id : 0 )
			}
			getOptionLabel={ ( option ): string => title( option ) }
			value={ post }
			{ ...props }
		/>
	);
};

function getPostOption( postType: string ): PostOption {
	return ( {
		value,
		isFocused,
		isSelected,
		innerRef,
		innerProps,
	}: PostOptionProps ): JSX.Element | null => {
		const postId = Number.parseInt( value ) || 0;
		const post = usePost( postType, postId );
		const authorName = useUserName(
			post ? post.author : 0,
			_x( 'Unknown Author', 'text', 'nelio-unlocker' )
		);
		const thumbnail = useMediaUrl( post ? post.featured_media : 0 );

		const typeName = useTypeName( postType );
		const supportsThumbnail = useSupportsThumbnail( postType );

		if ( ! post ) {
			return null;
		} //end if

		const { date_gmt: date } = post;

		const getBackground = (): string | undefined => {
			if ( isFocused ) {
				return '#007cba';
			} //end if
			if ( isSelected ) {
				return '#e2e4e7';
			} //end if
			return undefined; // eslint-disable-line
		};

		const getForeground = (): string | undefined => {
			if ( isFocused ) {
				return '#fff';
			} //end if
			if ( isSelected ) {
				return '#333';
			} //end if
			return undefined; // eslint-disable-line
		};

		return (
			<div
				css={ css( {
					backgroundColor: getBackground(),
					color: getForeground(),
					cursor: 'default',
					...( supportsThumbnail && { display: 'grid' } ),
					gridGap: '0.2em',
					gridTemplateColumns: '50px 1fr',
					gridTemplateRows: 'auto auto',
					padding: '0.2em 0.5em',
				} ) }
				ref={ innerRef }
				{ ...innerProps }
			>
				{ supportsThumbnail && (
					<div css={ css( { gridRow: '1/3' } ) }>
						<div
							css={ css( {
								backgroundColor: '#e8e8f0',
								backgroundImage: `url(${ thumbnail })`,
								backgroundSize: 'cover',
								marginTop: '5px',
								marginBottom: '5px',
								width: '40px',
								height: '40px',
							} ) }
						></div>
					</div>
				) }
				<div>{ title( post ) }</div>
				<div css={ css( { opacity: 0.6 } ) }>
					{ sprintf(
						/* translators: 1 -> post type name, 2 -> post id, 3 -> author name */
						_x( '%1$s #%2$s by %3$s', 'text', 'nelio-unlocker' ),
						typeName,
						postId,
						authorName
					) }
					{ ` • ${ dateI18n(
						getDateSettings().formats.date,
						date
					) }` }
				</div>
			</div>
		);
	};
} //end getPostOption()

// HELPERS

function getPostLoader( postType: string, cachePosts: PostCacher ): PostLoader {
	return ( search, prevOptions, page ): Promise< PostList > =>
		apiFetch< Response >( {
			path: getPath( postType, search, page ),
			parse: false,
		} )
			.then( parseResponse )
			.then(
				(
					response: PaginatedResponse< readonly Post[] >
				): PostList => {
					// eslint-disable-next-line functional/no-expression-statement
					cachePosts( response.data );
					return {
						options: response.data.map( ( p ) => ( {
							...p,
							label: `${ title( p ) }`,
							value: `${ p.id }`,
						} ) ),
						hasMore: page < response.totalPages,
						additional: page + 1,
					};
				}
			);
} //end getPostLoader()

function getPath( restBase: string, search: string, page: number ): string {
	return addQueryArgs( `/wp/v2/${ restBase }`, {
		page,
		...( search && { search } ),
	} );
} //end getPath()

function parseResponse(
	response: Response
): Promise< PaginatedResponse< readonly Post[] > > {
	const totalPages =
		parseInt( response.headers.get( 'X-WP-TotalPages' ) || '1' ) || 1;
	return response.json().then(
		(
			posts: readonly Post[]
		): Promise< PaginatedResponse< readonly Post[] > > => {
			return Promise.resolve( {
				data: [ ...posts ],
				totalPages,
			} );
		}
	);
} //end parseResponse()

function title( post: Post ): string {
	if ( post.title.raw ) {
		return post.title.raw;
	} //end if

	const el = document.createElement( 'div' );
	el.innerHTML = post.title.rendered; // eslint-disable-line
	if ( el.textContent && el.textContent.trim() ) {
		return el.textContent.trim();
	} //end if

	return '';
} //end title

// HOOKS

function useIsCacheReady(): boolean {
	return useSelect( ( select ): boolean => {
		const { getEntitiesByKind, getEntityRecords } = select( 'core' );

		// Retrieve postType entities:
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const entities: readonly any[] = getEntitiesByKind( 'postType' );

		// Trigger the population of postType entities:
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const records: readonly any[] = getEntityRecords( 'postType', 'post', {
			per_page: 1,
		} );

		return !! entities?.length || !! records?.length;
	} );
} //end useIsCacheReady()

function useCache( postType: string ): PostCacher {
	const { receiveEntityRecords } = useDispatch( 'core' );
	return ( posts ): void =>
		receiveEntityRecords( 'postType', postType, posts );
} //end useCache()

function useMediaUrl( mediaId: number ): string {
	return useSelect( ( select ): string => {
		if ( ! mediaId ) {
			return '';
		} //en dif
		const media: Media | undefined = select( 'core' ).getMedia( mediaId );
		return media ? media.source_url : '';
	} );
} //end useMediaUrl()
