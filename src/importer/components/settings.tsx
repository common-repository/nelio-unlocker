/* @jsx jsx */
/* eslint-disable functional/no-return-void */

// WordPress dependencies
import {
	BaseControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

// Nelio Unlocker dependencies
import { FullPostSearcher } from '@nelio-unlocker/components';
import { usePostTypes } from '@nelio-unlocker/hooks';
import type { InferredPost } from '@nelio-unlocker/data';
import type { ImportSettings as Value } from '@nelio-unlocker/types';

// External dependencies
import { css, jsx } from '@emotion/react';

// CONSTANTS

const STORE = 'nelio-unlocker-importer/data';

// VIEW

export const ImportSettings = (): JSX.Element | null => {
	const isVisible = useSelect(
		( select ): boolean => ! select( STORE ).isExportFilePending()
	);

	const settings = useSelect(
		( select ): Value => select( STORE ).getImportSettings()
	);

	if ( ! isVisible ) {
		return null;
	} //end if

	const title = _x( 'Import Settings', 'text', 'nelio-unlocker' );
	return (
		<BaseControl
			id="nelio-unlocker-source"
			label={ <strong>{ title }</strong> }
		>
			<ModeSelector />
			{ 'create' === settings.mode ? (
				<PostCreation />
			) : (
				<PostOverwriting />
			) }
		</BaseControl>
	);
};

const ModeSelector = (): JSX.Element => {
	const settings = useImportSettings();
	const isDisabled = useIsDisabled();
	const { switchImportMode } = useDispatch( STORE );

	const label = _x(
		'Overwrite selected item with imported content',
		'command',
		'nelio-unlocker'
	);

	const updateImportMode = ( useOverwrite: boolean ): void =>
		switchImportMode( useOverwrite ? 'overwrite' : 'create' );

	// NOTE. Workaround: ToggleControl doesn’t have “disabled” in its type definition.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const SuperToggleControl: any = ToggleControl;
	// NOTE. Remove this style (and the corresponding div that uses it), when ToggleControl works correctly.
	const style = {
		...( isDisabled && { filter: 'saturate(0)' } ),
		...( isDisabled && { opacity: 0.7 } ),
	};

	// NOTE. Once “disabled” works, we can remove this snippet.
	if ( isDisabled ) {
		return (
			<div style={ style }>
				<SuperToggleControl
					label={ label }
					checked={ 'overwrite' === settings.mode }
					disabled={ isDisabled }
					onChange={ (): null => null }
				/>
			</div>
		);
	} //end if

	return (
		<div style={ style }>
			<SuperToggleControl
				label={ label }
				checked={ 'overwrite' === settings.mode }
				disabled={ isDisabled }
				onChange={ updateImportMode }
			/>
		</div>
	);
};

const PostCreation = (): JSX.Element | null => {
	const settings = useImportSettings();
	const postTypes = usePostTypes();
	const isDisabled = useIsDisabled();
	const { setImportSettings } = useDispatch( STORE );

	if ( 'create' !== settings.mode ) {
		return null;
	} //end if

	const options = postTypes.map( ( pt ) => ( {
		value: pt.slug,
		label: pt.labels.singular_name,
	} ) );

	const { post } = settings;
	const updatePost = ( values: Partial< typeof post > ): void =>
		setImportSettings( {
			mode: 'create',
			post: { ...post, ...values },
		} );

	return (
		<div
			css={ css( {
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.5em',
			} ) }
		>
			<SelectControl
				disabled={ isDisabled }
				options={ options }
				value={ post.type }
				onChange={ ( type ): void => updatePost( { type } ) }
			/>
			<TextControl
				css={ css( {
					flexGrow: 1,
					minWidth: '10em',
				} ) }
				value={ post.title }
				onChange={ ( title ): void => updatePost( { title } ) }
				disabled={ isDisabled }
				placeholder={ _x( 'Add a title…', 'user', 'nelio-unlocker' ) }
			/>
		</div>
	);
};

const PostOverwriting = (): JSX.Element | null => {
	const settings = useImportSettings();
	const isDisabled = useIsDisabled();
	const inferredPost = useSelect(
		( select ): InferredPost => select( STORE ).getInferredPost()
	);
	const { setImportSettings } = useDispatch( STORE );

	if ( 'overwrite' !== settings.mode ) {
		return null;
	} //end if

	const { post } = settings;
	const updatePost = ( values: Partial< typeof post > ): void =>
		setImportSettings( {
			mode: 'overwrite',
			post:
				0 === values.id && values.type === inferredPost.type
					? inferredPost
					: { ...post, ...values },
		} );

	return (
		<div>
			<FullPostSearcher
				isDisabled={ isDisabled }
				postId={ post.id }
				postType={ post.type }
				onPostIdChange={ ( id ): void => updatePost( { id } ) }
				onPostTypeChange={ ( type, id ): void =>
					updatePost( { type, id } )
				}
			/>
		</div>
	);
};

// HOOKS

const useImportSettings = (): Value =>
	useSelect( ( select ): Value => select( STORE ).getImportSettings() );

const useIsDisabled = (): boolean =>
	useSelect(
		( select ): boolean => select( STORE ).getMode() !== 'export-file-ready'
	);
