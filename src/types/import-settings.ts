export type ImportSettings = CreatePostSettings | OverwritePostSettings;

type CreatePostSettings = {
	readonly mode: 'create';
	readonly post: {
		readonly type: string;
		readonly title: string;
	};
};

type OverwritePostSettings = {
	readonly mode: 'overwrite';
	readonly post: {
		readonly type: string;
		readonly id: number;
	};
};
