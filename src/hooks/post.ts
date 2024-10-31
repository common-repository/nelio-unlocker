// WordPress dependencies
import { useSelect } from '@wordpress/data';

// Types

export type Post = {
	readonly id: number;
	readonly title: {
		readonly raw: string;
		readonly rendered: string;
	};
	readonly author: number;
	readonly date_gmt: string; // eslint-disable-line camelcase
	readonly featured_media: number; // eslint-disable-line camelcase
	readonly type: string;
};

// Hook

export function usePost( postType: string, postId: number ): Post | false {
	return useSelect( ( select ) => {
		if ( ! postId ) {
			return false;
		} //end if
		return (
			select( 'core' ).getEntityRecord( 'postType', postType, postId ) ||
			false
		);
	} );
} //end usePost()
