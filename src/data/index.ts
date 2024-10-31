// WordPress dependencies
import '@wordpress/notices';

import { registerStore } from '@wordpress/data';

// Internal dependencies
import reducer from './reducer';
import * as realActions from './actions';
import * as selectors from './selectors';
import * as sideEffects from './side-effects';
import { controls } from './controls';

// TYPES

export * from './types';

const actions = { ...sideEffects, ...realActions };

export type Actions = RemoveAction< typeof actions >;
export type Selectors = RemoveState< typeof selectors >;

// CONSTANTS

const STORE = 'nelio-unlocker-importer/data';

// SIDE EFFECTS

// eslint-disable-next-line functional/no-expression-statement
registerStore( STORE, {
	reducer,
	controls,
	actions: { ...realActions, ...sideEffects },
	selectors,
} );

declare module '@wordpress/data' {
	function dispatch( key: typeof STORE ): Actions;
	function select( key: typeof STORE ): Selectors;
}
