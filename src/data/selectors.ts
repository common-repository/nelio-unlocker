// Nelio Unlocker dependencies
import type { ConversionRequest, ImportSettings } from '@nelio-unlocker/types';

// External dependencies
import { last } from 'lodash';

// Internal dependencies
import type { State } from './reducer';
import type { AppMode, InferredPost, LogMessage } from './types';

// SELECTORS

export function getApiUrl( state: State ): string {
	return state.pluginSettings.apiUrl;
} //end getApiUrl()

export function getPluginVersion( state: State ): string {
	return state.pluginSettings.pluginVersion;
} //end getPluginVersion()

export function getResultId( state: State ): number {
	return getMode( state ) === 'done' && state.results.importedPost
		? state.results.importedPost.id
		: 0;
} //end getResultId()

export function getResultLink( state: State ): string | false {
	return getMode( state ) === 'done' && state.results.importedPost
		? state.results.importedPost.links.edit
		: false;
} //end getResultLink()

export function getMode( state: State ): AppMode {
	return state.mode;
} //end getMode()

export function getImportSettings( state: State ): ImportSettings {
	return state.importSettings;
} //end getImportSettings()

export function areImportSettingsReady( state: State ): boolean {
	const settings = getImportSettings( state );
	return 'create' === settings.mode
		? 0 < settings.post.title.trim().length
		: !! settings.post.id;
} //end areImportSettingsReady()

export function getConversionRequest(
	state: State
): ConversionRequest | false {
	return state.request;
} //end getConversionRequest()

export function isExportFilePending( state: State ): boolean {
	return ! [ 'export-file-ready', 'converting', 'done', 'error' ].includes(
		state.mode
	);
} //end isExportFilePending()

export function isUploadingExportFile( state: State ): boolean {
	return 'uploading-export-file' === state.mode;
} //end isUploadingExportFile()

export function isExportFileReady( state: State ): boolean {
	return 'export-file-ready' === state.mode;
} //end isExportFileReady()

export function isInvalidExportFile( state: State ): boolean {
	return 'export-file-error' === state.mode;
} //end isInvalidExportFile()

export function isConverting( state: State ): boolean {
	return 'converting' === state.mode;
} //end isConverting()

export function isConversionDone( state: State ): boolean {
	return 'done' === state.mode;
} //end isConversionDone()

export function isConversionFailed( state: State ): boolean {
	return 'error' === state.mode;
} //end isConversionFailed()

export function getLogMessages( state: State ): List< LogMessage > {
	return state.logs;
} //end getLogMessages()

export function getLastLogMessage( state: State ): LogMessage | false {
	return last( state.logs ) || false;
} //end getLastLogMessage()

export function getInferredPost( state: State ): InferredPost {
	return state.results.inferredPost;
} //end getInferredPost()
