// WordPress dependencies
import { useSelect } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

// Types

type User = {
	readonly first_name: string; // eslint-disable-line camelcase
	readonly last_name: string; // eslint-disable-line camelcase
	readonly username: string;
};

// Hook

export function useUser( userId: number ): User | false {
	return useSelect( ( select ) => select( 'core' ).getUser( userId ) || false );
} //end useUser()

export function useUserName( userId: number, defaultName?: string ): string {
	const user = useUser( userId );
	const name = user
		? `${ user.first_name } ${ user.last_name }`.trim() || user.username
		: defaultName;
	return name || _x( 'Unknown', 'text', 'nelio-unlocker' );
} //end useUserName()
