import { useEffect, useState } from 'react';

import { getBlogsInServer } from '/actions/handleBlog';
import { getUserProfile } from '/actions/handleUser';
import { ManagementBlog } from '/components/blog';
import { ProtectRoute } from '/components/auth';

function Management({ token, profile, blogList, size }) {
	return (
		<ProtectRoute>
			<ManagementBlog blogList={blogList} token={token} size={size} />
		</ProtectRoute>
	);
}

export default Management;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const profile = await getUserProfile(accessToken);
	const blogList = await getBlogsInServer(encodeURI('포션'));
	const size = await blogList.data.length;

	return {
		props: {
			token: accessToken,
			profile,
			blogList,
			size,
		},
	};
}
