// WordPress dependencies
import '@wordpress/core-data';
import '@nelio-unlocker/data';

import { render } from '@wordpress/element';

// Internal dependencies
import { View } from './view';

declare const React: unknown;
const wrapper = document.getElementById( 'nelio-unlocker-wrapper' );
render( <View />, wrapper ); // eslint-disable-line functional/no-expression-statement
