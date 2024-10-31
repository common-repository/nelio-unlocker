/* eslint-disable @typescript-eslint/no-explicit-any, functional/no-return-void */

// ====================================
// WORDPRESS
// ====================================

// NOTE. This should be removed once the package exports the function correctly.
declare module '@wordpress/i18n' {
	export const __: ( text: string, domain?: string ) => string;
	export const _x: (
		text: string,
		context: string,
		domain?: string
	) => string;
	export const _nx: (
		singular: string,
		plural: string,
		qty: number,
		context: string,
		domain?: string
	) => string;
	export const sprintf: ( templ: string, ...args: readonly any[] ) => string;
}

// NOTE. This should be removed once the package exports the function correctly (@types exports selectors as functions returning void... WTF?).
declare module '@wordpress/data-controls' {
	export function apiFetch( options: any ): any;
	export const controls: {
		readonly API_FETCH: ( action: any ) => Promise< any >;
		readonly DISPATCH: ( action: any ) => void;
		readonly SELECT: ( action: any ) => any;
	};
	export function dispatch(
		storeKey: string,
		actionName: string,
		...args: readonly any[]
	): void;
	export function select(
		storeKey: string,
		selectorName: string,
		...args: readonly any[]
	): any;
}

declare module 'color-steps' {
	const main: ( c1: string, c2: string, s?: number ) => readonly string[];
	export default main;
}

declare module 'browser-env' {
	const main: () => void;
	export default main;
}

declare module '*.svg' {
	const content: any;
	export default content;
}

// ====================================
// LIST
// ====================================

/* eslint-disable functional/no-mixed-type, functional/no-method-signature */
declare type List< T > = {
	readonly [ index: number ]: T | undefined;
	readonly [ Symbol.iterator ]: () => IterableIterator< T >;
	readonly length: number;
	readonly map: < U extends any >(
		fn: ( value: T, index: number, list: List< T > ) => U
	) => List< U >;
	readonly filter: (
		fn: ( value: T, index: number, list: List< T > ) => boolean
	) => List< T >;
	readonly reduce: < U extends any >(
		fn: ( prevValue: U, currValue: T, index: number, list: List< T > ) => U,
		initialValue: U
	) => U;

	includes( searchElement: T, fromIndex?: number ): boolean;
	find(
		predicate: ( value: T, index: number, array: readonly T[] ) => boolean
	): T | undefined;
	every(
		predicate: ( value: T, index: number, array: readonly T[] ) => boolean
	): boolean;
	some(
		predicate: ( value: T, index: number, array: readonly T[] ) => boolean
	): boolean;
};
/* eslint-enable functional/no-mixed-type, functional/no-method-signature */

// ====================================
// UTILITIES
// ====================================

type OmitFirstArg< F > = F extends ( x: any, ...args: infer P ) => infer R
	? ( ...args: P ) => R
	: never;

type OmitFirstArgs< R extends Record< string, any > > = {
	readonly [ K in keyof R ]: OmitFirstArg< R[ K ] >;
};

type RemoveReturnType< F > = F extends ( ...args: infer P ) => any
	? ( ...args: P ) => void // eslint-disable-line
	: never;

type RemoveReturnTypes< R extends Record< string, any > > = {
	readonly [ K in keyof R ]: RemoveReturnType< R[ K ] >;
};

type RemoveState< R > = OmitFirstArgs< R >;
type RemoveAction< R > = RemoveReturnTypes< R >;
