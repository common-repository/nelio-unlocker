/* @jsx jsx */

// WordPress dependencies
import { _x } from '@wordpress/i18n';

// External dependencies
import { css, jsx } from '@emotion/react';

// VIEW

export const Instructions = (): JSX.Element => (
	<div css={ STYLE }>
		{ _x(
			'Howdy! Upload your Nelio Unlocker export file (JSON), follow the instructions to set up the import process, and we’ll take care of the rest.',
			'user',
			'nelio-unlocker'
		) }
	</div>
);

// STYLES

const STYLE = css( {
	marginBottom: '1em',
} );
