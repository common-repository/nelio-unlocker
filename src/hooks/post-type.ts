// WordPress dependencies
import { useSelect } from '@wordpress/data';

// External dependencies
import { find } from 'lodash';

// Types

export type PostType = {
	readonly slug: string;
	readonly viewable: boolean;
	readonly rest_base: string; // eslint-disable-line camelcase
	readonly labels: {
		readonly add_new_item: string; // eslint-disable-line camelcase
		readonly name: string;
		readonly new_item: string; // eslint-disable-line camelcase
		readonly singular_name: string; // eslint-disable-line camelcase
	};
	readonly supports: {
		readonly thumbnail?: true;
	};
};

// Hook

export function usePostType( type: string ): PostType | false {
	const postTypes = usePostTypes();
	return find( postTypes, { slug: type } ) || false;
} //end usePostTypes()

export function usePostTypes(): ReadonlyArray< PostType > {
	return useSelect(
		( select ): ReadonlyArray< PostType > =>
			select( 'core' ).getPostTypes() || []
	)
		.filter( ( pt ) => pt.viewable )
		.filter( ( pt ) => pt.slug !== 'attachment' );
} //end usePostTypes()

export function useTypeName( type: string ): string {
	return useSelect( ( select ): string => {
		const postType: PostType | undefined = select( 'core' ).getPostType(
			type
		);
		return ! postType ? type : postType.labels.singular_name;
	} );
} //end useTypeName()

export function useRestBase( type: string ): string | false {
	return useSelect( ( select ): string | false => {
		const postType: PostType | undefined = select( 'core' ).getPostType(
			type
		);
		return ! postType ? false : postType.rest_base;
	} );
} //end useTypeName()

export function useSupportsThumbnail( type: string ): boolean {
	return useSelect( ( select ): boolean => {
		const postType: PostType | undefined = select( 'core' ).getPostType(
			type
		);
		return !! postType && !! postType.supports.thumbnail;
	} );
} //end useSupportsThumbnail()
