/* @jsx jsx */

// External dependencies
import { jsx } from '@emotion/react';

// WordPress dependencies
import { NoticeList } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

export const ErrorLog = (): JSX.Element => {
	const notices = useSelect(
		( select ): readonly NoticeList.Notice[] =>
			select(
				'core/notices'
			).getNotices() as readonly NoticeList.Notice[]
	);
	const { removeNotice } = useDispatch( 'core/notices' );

	return <NoticeList notices={ notices } onRemove={ removeNotice } />;
};
