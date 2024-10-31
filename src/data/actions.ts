// Nelio Unlocker dependencies
import type { ConversionRequest, ImportSettings } from '@nelio-unlocker/types';

// Internal dependencies
import type { LogMessage, NelioPost, PluginSettings } from './types';

// TYPES

export type Action =
	| AddLogMessage
	| ClearLogs
	| InitFileUpload
	| FailFileUpload
	| InitImportSettings
	| InitConversion
	| EndConversion
	| FailConversion
	| Reset
	| SetImportedPost
	| SetPluginSettings
	| SetImportSettings
	| SwitchImportMode;

export type SetImportedPost = {
	readonly type: 'SET_IMPORTED_POST';
	readonly post: NelioPost;
};

export type SetPluginSettings = {
	readonly type: 'SET_PLUGIN_SETTINGS';
	readonly settings: PluginSettings;
};

export type SetImportSettings = {
	readonly type: 'SET_IMPORT_SETTINGS';
	readonly settings: ImportSettings;
};

export type SwitchImportMode = {
	readonly type: 'SWITCH_IMPORT_MODE';
	readonly mode: ImportSettings[ 'mode' ];
};

export type AddLogMessage = {
	readonly type: 'ADD_LOG_MESSAGE';
	readonly message: LogMessage;
};

export type ClearLogs = {
	readonly type: 'CLEAR_LOGS';
};

export type InitConversion = {
	readonly type: 'INIT_CONVERSION';
};

export type EndConversion = {
	readonly type: 'END_CONVERSION';
};

export type FailConversion = {
	readonly type: 'FAIL_CONVERSION';
};

export type Reset = {
	readonly type: 'RESET';
};

export type InitFileUpload = {
	readonly type: 'INIT_FILE_UPLOAD';
};

export type InitImportSettings = {
	readonly type: 'INIT_IMPORT_SETTINGS';
	readonly request: ConversionRequest;
	readonly settings: ImportSettings;
};

export type FailFileUpload = {
	readonly type: 'FAIL_FILE_UPLOAD';
	readonly reason: string;
};

// ACTIONS

export function setImportedPost( post: NelioPost ): SetImportedPost {
	return {
		type: 'SET_IMPORTED_POST',
		post,
	};
} //end setImportedPost()

export function setImportSettings(
	settings: ImportSettings
): SetImportSettings {
	return {
		type: 'SET_IMPORT_SETTINGS',
		settings,
	};
} //end setImportSettings()

export function switchImportMode(
	mode: ImportSettings[ 'mode' ]
): SwitchImportMode {
	return {
		type: 'SWITCH_IMPORT_MODE',
		mode,
	};
} //end setImportSettings()

export function setPluginSettings(
	settings: PluginSettings
): SetPluginSettings {
	return {
		type: 'SET_PLUGIN_SETTINGS',
		settings,
	};
} //end setPluginSettings()

export function addLogMessage( message: LogMessage ): AddLogMessage {
	return {
		type: 'ADD_LOG_MESSAGE',
		message,
	};
} //end addLogMessage()

export function clearLogs(): ClearLogs {
	return {
		type: 'CLEAR_LOGS',
	};
} //end clearLogs()

export function initConversion(): InitConversion {
	return {
		type: 'INIT_CONVERSION',
	};
} //end initConversion()

export function endConversion(): EndConversion {
	return {
		type: 'END_CONVERSION',
	};
} //end endConversion()

export function failConversion(): FailConversion {
	return {
		type: 'FAIL_CONVERSION',
	};
} //end failConversion()

export function reset(): Reset {
	return {
		type: 'RESET',
	};
} //end reset()

export function initFileUpload(): InitFileUpload {
	return {
		type: 'INIT_FILE_UPLOAD',
	};
} //end initFileUpload()

export function initImportSettings(
	request: ConversionRequest,
	settings: ImportSettings
): InitImportSettings {
	return {
		type: 'INIT_IMPORT_SETTINGS',
		request,
		settings,
	};
} //end initImportSettings()

export function failFileUpload( reason: string ): FailFileUpload {
	return {
		type: 'FAIL_FILE_UPLOAD',
		reason,
	};
} //end failFileUpload()
