export type ConversionRequest = {
	readonly vdom: string;
	readonly settings: ConversionSettings;
	readonly hash: string;
};

export type ConversionSettings = {
	readonly builder: string;
	readonly attachments: Attachments;
	readonly postType: string;
	readonly pluginVersion: string;
	readonly url: string;
};

export type ConversionResponse = {
	readonly result: ConversionResult;
};

export type ConversionResult = {
	readonly content: string;
	readonly meta: Record< string, string | number | boolean >;
};

export type Attachments = Record< string, ImageAttachment >;

export type ImageAttachment = {
	readonly id: number;
	readonly url: string;
};
