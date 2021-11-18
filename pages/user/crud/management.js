import { useEffect, useState } from 'react';

import { getBlogsInServer } from '/actions/handleBlog';
import { getUserProfile } from '/actions/handleUser';
import { ManagementBlog } from '/components/blog';
import { ProtectRoute } from '/components/auth';

function Management({ token, profile, blogList }) {
	return (
		<ProtectRoute>
			<ManagementBlog
				blogList={blogList}
				token={token}
				size={blogList.data.length}
			/>
		</ProtectRoute>
	);
}

export default Management;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const profile = await getUserProfile(accessToken);
	const blogList = await getBlogsInServer(encodeURI(profile.profile.username));

	return {
		props: {
			token: accessToken,
			profile,
			blogList,
		},
	};
}
