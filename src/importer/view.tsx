/* @jsx jsx */
/* eslint-disable functional/no-return-void */

// WordPress dependencies
import { StrictMode } from '@wordpress/element';

// External dependencies
import { css, jsx } from '@emotion/react';

// Internal dependencies
import {
	Instructions,
	JsonSelector,
	ErrorLog,
	ImportSettings,
	Actions,
} from './components';
import Logo from './logo.svg';

// VIEW

export const View = (): JSX.Element => (
	<StrictMode>
		<ErrorLog />
		<div css={ BLOCK_STYLE }>
			<h1 className="screen-reader-text">Nelio Unlocker</h1>
			<Logo css={ LOGO_STYLE } />
			<Instructions />
			<JsonSelector />
			<ImportSettings />
			<Actions />
		</div>
	</StrictMode>
);

// STYLES

const BLOCK_STYLE = css( {
	background: 'white',
	border: '1px solid rgba(0,0,0,0.2)',
	borderRadius: '5px',
	margin: '3em auto 0',
	maxWidth: '40em',
	padding: '2em',
} );

const LOGO_STYLE = css`
	display: block;
	margin: 0 auto 2em;
	max-width: 20em;

	path.unlocker-text,
	path.logo-circle {
		fill: #b02a2a;
	}
	path.dinamic-lines,
	path.padlock-shank,
	path.padlock-body {
		fill: white;
	}
`;
