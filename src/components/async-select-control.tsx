/* @jsx jsx */
import AsyncSelect, { Props, AsyncResult } from 'react-select-async-paginate';
import type { Styles } from 'react-select';

// External dependencies
import { css, jsx } from '@emotion/react';
import type { CSSProperties } from 'react';

const WORDPRESS_TEXT_COLOR = '#32373c';
const WORDPRESS_ACCENT_COLOR = '#007cba';

export type AsyncSelectControlProps< T > = Props< T, number > & {
	readonly page?: number;
};

export type AsyncSelectControlResult< T > = AsyncResult< T, number >;

type State = {
	readonly isFocused?: boolean;
	readonly isSelected?: boolean;
	readonly isDisabled?: boolean;
};

export const DEFAULT_STYLE: Styles = {
	container: ( style ) => ( {
		...style,
		margin: 0,
		padding: 0,
	} ),

	singleValue: ( style, state: State ) => {
		return {
			...style,
			color: state.isDisabled ? '#8d96a0' : 'black',
			textShadow: '0 1px 0 #fff',
		};
	},

	control: ( style, state: State ) => ( {
		background: state.isDisabled ? '#f3f4f5' : '#fff',
		border: `1px solid ${ getBorderColor( state ) }`,
		borderRadius: '2px',
		boxShadow: state.isFocused
			? `0 0 0 1px ${ WORDPRESS_ACCENT_COLOR }`
			: '',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'row',
		fontSize: '13px',
		height: '30px',
		padding: '0',
		paddingRight: '0.5em',
	} ),

	input: () => ( {
		margin: 0,
		marginTop: '-1px',
		padding: 0,
	} ),

	groupHeading: ( style ) => ( {
		...style,
		padding: '1em',
	} ),

	loadingIndicator: () => ( {
		display: 'none',
	} ),

	indicatorSeparator: () => ( {
		display: 'none',
	} ),

	multiValue: ( style ) => ( {
		...style,
		marginRight: '0.5em',
	} ),

	menuPortal: ( style ) => {
		const sls = style && style.left ? `${ style.left }` : `0`;
		const styleLeft = isNaN( parseInt( sls ) ) ? 0 : parseInt( sls );

		const margin = 14;
		const bodyWidth = document.body.clientWidth;
		const width = Math.min( bodyWidth - 2 * margin, 300 );

		const overflowX = Math.abs(
			Math.min( 0, bodyWidth - ( styleLeft + width + 14 ) )
		);
		const left = styleLeft - overflowX;

		return {
			...style,
			zIndex: 999999,
			width,
			left,
			right: left + width - margin,
		};
	},

	menu: ( style ) => ( {
		...style,
		borderRadius: 0,
	} ),

	option: ( style, state: State ) => ( {
		...style,
		...getOptionColor( state ),
		padding: '0.5em 1em',
	} ),
};

const DropdownIndicator = (): JSX.Element => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		role="img"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path>
	</svg>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AsyncSelectControl = < T extends any >( {
	styles,
	page = 1,
	components,
	...props
}: AsyncSelectControlProps< T > ): JSX.Element => {
	return (
		<AsyncSelect
			css={ css`
				input[type='text'] {
					border: none;
					box-shadow: none;
				}
			` }
			styles={ { ...DEFAULT_STYLE, ...styles } }
			menuIsOpen={ true }
			defaultMenuIsOpen={ true }
			menuPortalTarget={ document.body }
			additional={ page }
			components={ {
				...components,
				DropdownIndicator,
			} }
			{ ...props }
		></AsyncSelect>
	);
};

const getBorderColor = ( { isDisabled, isFocused }: State ): string => {
	if ( isDisabled ) {
		return '#cccccc';
	} //end if

	if ( isFocused ) {
		return WORDPRESS_ACCENT_COLOR;
	} //end if

	return '#757575';
};

const getOptionColor = ( { isSelected, isFocused }: State ): CSSProperties => {
	if ( isFocused ) {
		return {
			background: WORDPRESS_ACCENT_COLOR,
			color: '#fff',
		};
	} //end if

	if ( isSelected ) {
		return {
			background: '#f1f1f1',
			color: WORDPRESS_TEXT_COLOR,
		};
	} //end if

	return {
		background: '#fff',
		color: WORDPRESS_TEXT_COLOR,
	};
};
