/* @jsx jsx */
/* eslint-disable functional/no-return-void */

// WordPress dependencies
import '@wordpress/core-data';
import { SelectControl } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

// Nelio Unlocker dependencies
import { usePostTypes } from '@nelio-unlocker/hooks';

// External dependencies
import { css, jsx } from '@emotion/react';

// Internal dependencies
import { PostSearcher } from './post-searcher';

// TYPES

export type FullPostSearcherProps = {
	readonly isDisabled?: boolean;
	readonly onPostIdChange: ( postId: number ) => void;
	readonly onPostTypeChange: ( postType: string, postId: number ) => void;
	readonly postId: number;
	readonly postType: string;
};

// VIEWS

export const FullPostSearcher = ( {
	isDisabled,
	onPostTypeChange,
	onPostIdChange,
	postType,
	postId,
}: FullPostSearcherProps ): JSX.Element => {
	const postTypes = usePostTypes().map( ( pt ) => ( {
		label: pt.labels.singular_name,
		value: pt.slug,
	} ) );

	const postTypeLoader = {
		label: _x( 'Loading…', 'text', 'nelio-unlocker' ),
		value: '',
	};

	return (
		<div
			css={ css( {
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.5em',
			} ) }
		>
			<SelectControl
				css={ css`
					max-width: 10em;
					width: 100%;

					.components-base-control__field {
						margin: 0;
						padding: 0;
					}
				` }
				disabled={ isDisabled || ! postTypes.length }
				// eslint-disable-next-line functional/no-return-void
				onChange={ ( value ): void => onPostTypeChange( value, 0 ) }
				options={ postTypes.length ? postTypes : [ postTypeLoader ] }
				value={ postType }
			/>
			<PostSearcher
				css={ css( {
					flexGrow: 1,
					minWidth: '10em',
				} ) }
				isDisabled={ isDisabled || ! postTypes.length }
				onChange={ onPostIdChange }
				postType={ postType }
				value={ postId }
			/>
		</div>
	);
};
