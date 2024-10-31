/* @jsx jsx */
/* eslint-disable functional/no-return-void */

// WordPress dependencies
import { Button, Dashicon, FormFileUpload } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

// External dependencies
import { css, jsx } from '@emotion/react';

// CONSTANTS

const STORE = 'nelio-unlocker-importer/data';

// VIEW

export const JsonSelector = (): JSX.Element | null => {
	const isVisible = useSelect( ( select ): boolean =>
		select( STORE ).isExportFilePending()
	);

	const isUploading = useSelect( ( select ): boolean =>
		select( STORE ).isUploadingExportFile()
	);
	const uploadError = useSelect( ( select ): false | string =>
		select( STORE ).isInvalidExportFile()
			? select( STORE ).getLogMessages()[ 0 ] || ''
			: false
	);

	const { initFileUpload, uploadRequest } = useDispatch( STORE );

	/* eslint-disable functional/immutable-data, functional/no-expression-statement */
	const loadFile = ( file: File ): void => {
		initFileUpload();
		const reader = new FileReader();
		reader.onload = ( ev ): void =>
			uploadRequest( file.name, ev?.target?.result as string );
		reader.readAsText( file );
	};
	/* eslint-enable functional/immutable-data, functional/no-expression-statement */

	if ( ! isVisible ) {
		return null;
	} //end if

	const label = isUploading
		? _x( 'Loading JSON Export…', 'command', 'nelio-unlocker' )
		: _x( 'Choose JSON Export', 'command', 'nelio-unlocker' );

	return (
		<FormFileUpload
			accept="application/json"
			onChange={ ( event ): void | null =>
				event.target.files &&
				event.target.files[ 0 ] &&
				loadFile( event.target.files[ 0 ] )
			}
			render={ ( { openFileDialog } ): JSX.Element => (
				<div css={ COMPONENT_STYLE }>
					<div css={ CENTER_BUTTON }>
						<Button
							isSecondary
							isBusy={ isUploading }
							disabled={ isUploading }
							onClick={ openFileDialog }
						>
							{ label }
						</Button>
					</div>
					{ !! uploadError && (
						<div css={ ERROR_STYLE }>
							<Dashicon icon="warning" />
							<span>{ ` ${ uploadError }` }</span>
						</div>
					) }
				</div>
			) }
		/>
	);
};

// STYLES

const COMPONENT_STYLE = css( {
	marginTop: '2em',
} );

const CENTER_BUTTON = css( {
	display: 'flex',
	justifyContent: 'center',
} );

const ERROR_STYLE = css`
	margin-top: 2em;
	color: crimson;
	display: flex;

	& span:first-of-type {
		margin-right: 0.2em;
	}
`;
