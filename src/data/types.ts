export type { Attachments, ImageAttachment } from '@nelio-unlocker/types';

export type AppMode =
	| 'awaiting-export-file'
	| 'uploading-export-file'
	| 'export-file-ready'
	| 'export-file-error'
	| 'converting'
	| 'error'
	| 'done';

export type PluginSettings = {
	readonly apiUrl: string;
	readonly pluginVersion: string;
};

export type LogMessage = string;
export type ErrorMessage = string;

export type ImportResults = {
	readonly importedPost: NelioPost | false;
	readonly inferredPost: InferredPost;
};

export type InferredPost = {
	readonly type: string;
	readonly id: number;
};

export type NelioPost = {
	readonly id: number;
	readonly type: string;
	readonly links: {
		readonly edit: string;
	};
};
