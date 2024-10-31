/* @jsx jsx */
/* eslint-disable functional/no-return-void */

// WordPress dependencies
import { Button, ExternalLink } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

// External dependencies
import { css, jsx } from '@emotion/react';

// CONSTANTS

const STORE = 'nelio-unlocker-importer/data';

// VIEW

export const Actions = (): JSX.Element | null => {
	const isVisible = useSelect(
		( select ): boolean => ! select( STORE ).isExportFilePending()
	);

	const canConvert = useCanConvert();
	const resultLink = useSelect(
		( select ): string => select( STORE ).getResultLink() || ''
	);
	const isConverting = useSelect( ( select ): boolean =>
		select( STORE ).isConverting()
	);
	const isConversionDone = useSelect( ( select ): boolean =>
		select( STORE ).isConversionDone()
	);
	const isConversionFailed = useSelect( ( select ): boolean =>
		select( STORE ).isConversionFailed()
	);

	const { convert, reset } = useDispatch( STORE );

	if ( ! isVisible ) {
		return null;
	} //end if

	if ( isConversionFailed ) {
		return (
			<div css={ BUTTON_GROUP_STYLE }>
				<span>{ _x( 'Error!', 'text', 'nelio-unlocker' ) }</span>
				<Button isPrimary onClick={ reset }>
					{ _x( 'Start Over', 'command', 'nelio-unlocker' ) }
				</Button>
			</div>
		);
	} //end if

	if ( isConversionDone ) {
		return (
			<div css={ BUTTON_GROUP_STYLE }>
				<ExternalLink
					className="components-button is-secondary"
					href={ resultLink }
				>
					{ _x( 'Edit Page', 'text', 'nelio-unlocker' ) }
				</ExternalLink>
				<Button isPrimary onClick={ reset }>
					{ _x( 'New Conversion', 'command', 'nelio-unlocker' ) }
				</Button>
			</div>
		);
	} //end if

	return (
		<div>
			<div css={ BUTTON_GROUP_STYLE }>
				{ isConverting ? <ConversionFeedback /> : <BackButton /> }
				<Button
					isPrimary
					disabled={ ! canConvert }
					onClick={ convert }
					isBusy={ isConverting }
				>
					{ isConverting
						? _x( 'Importing…', 'text', 'nelio-unlocker' )
						: _x( 'Import Now', 'command', 'nelio-unlocker' ) }
				</Button>
			</div>
		</div>
	);
};

const ConversionFeedback = (): JSX.Element => {
	const logMessage = useLogMessage();
	const isConverting = useSelect( ( select ): boolean =>
		select( STORE ).isConverting()
	);
	return <div>{ isConverting ? logMessage : '' }</div>;
};

const BackButton = (): JSX.Element => {
	const { reset } = useDispatch( STORE );
	return (
		<Button isSecondary onClick={ reset }>
			{ _x( 'Back', 'command', 'nelio-unlocker' ) }
		</Button>
	);
};

// HOOKS

function useCanConvert(): boolean {
	return useSelect( ( select ): boolean => {
		const { isExportFileReady, areImportSettingsReady } = select( STORE );
		return isExportFileReady() && areImportSettingsReady();
	} );
} //end useCanConvert()

function useLogMessage(): string {
	return useSelect(
		( select ): string =>
			select( STORE ).getLastLogMessage() || ''
	);
} //end useLogMessage()

// STYLES

const BUTTON_GROUP_STYLE = css( {
	alignItems: 'baseline',
	display: 'flex',
	gap: '0.5em',
	justifyContent: 'space-between',
	marginTop: '2em',
} );
