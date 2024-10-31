// WordPress dependencies
import { _x } from '@wordpress/i18n';

// Nelio Unlcoker dependencies
import type { ConversionRequest, ImportSettings } from '@nelio-unlocker/types';

// Internal dependencies
import type { Action } from './actions';
import type {
	AppMode,
	LogMessage,
	PluginSettings,
	ImportResults,
} from './types';

// TYPES

export type State = {
	readonly mode: AppMode;
	readonly request: ConversionRequest | false;
	readonly importSettings: ImportSettings;
	readonly logs: List< LogMessage >;
	readonly pluginSettings: PluginSettings;
	readonly results: ImportResults;
};

type AnyAction = {
	readonly type: string;
};

// REDUCER

const INIT = {
	mode: 'awaiting-export-file' as const,
	request: false as const,
	importSettings: {
		mode: 'overwrite' as const,
		post: { type: 'page', id: 0 },
	},
	logs: [] as List< LogMessage >,
	pluginSettings: {
		apiUrl: '',
		pluginVersion: '',
	},
	results: {
		importedPost: false as const,
		inferredPost: { type: 'page', id: 0 },
	},
};

export default function( state: State = INIT, action: AnyAction ): State {
	return reducer( state, action as Action ) ?? state;
} //end function()

function reducer( state: State, action: Action ): State {
	switch ( action.type ) {
		case 'ADD_LOG_MESSAGE':
			return {
				...state,
				logs: [ ...state.logs, action.message ],
			};

		case 'CLEAR_LOGS':
			return {
				...state,
				logs: [] as List< LogMessage >,
			};

		case 'INIT_CONVERSION':
			return {
				...state,
				mode: 'converting',
				logs: [ _x( 'Initializing…', 'text', 'nelio-unlocker' ) ],
			};

		case 'END_CONVERSION':
			return {
				...state,
				mode: 'done',
				logs: INIT.logs,
			};

		case 'FAIL_CONVERSION':
			return {
				...state,
				mode: 'error',
			};

		case 'RESET':
			return {
				...state,
				mode: 'awaiting-export-file',
				request: INIT.request,
				logs: INIT.logs,
				importSettings: INIT.importSettings,
				results: INIT.results,
			};

		case 'INIT_FILE_UPLOAD':
			return {
				...state,
				mode: 'uploading-export-file',
				request: INIT.request,
			};

		case 'INIT_IMPORT_SETTINGS':
			return {
				...state,
				mode: 'export-file-ready',
				request: action.request,
				importSettings: action.settings,
				results: {
					...INIT.results,
					...( 'overwrite' === action.settings.mode && {
						inferredPost: action.settings.post,
					} ),
				},
			};

		case 'SWITCH_IMPORT_MODE':
			if ( 'overwrite' === action.mode ) {
				return {
					...state,
					importSettings: {
						mode: 'overwrite',
						post: state.results.inferredPost,
					},
				};
			} //end if
			return {
				...state,
				importSettings: {
					mode: 'create',
					post: { type: 'page', title: '' },
				},
			};

		case 'SET_IMPORT_SETTINGS':
			return {
				...state,
				importSettings: action.settings,
			};

		case 'FAIL_FILE_UPLOAD':
			return {
				...state,
				mode: 'export-file-error',
				request: INIT.request,
				logs: [ action.reason ],
			};

		case 'SET_IMPORTED_POST':
			return {
				...state,
				results: {
					...state.results,
					importedPost: action.post,
				},
			};

		case 'SET_PLUGIN_SETTINGS':
			return {
				...state,
				pluginSettings: {
					...state.pluginSettings,
					...action.settings,
				},
			};
	} //end switch
} //end reducer()
