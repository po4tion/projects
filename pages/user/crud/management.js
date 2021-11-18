import { useEffect, useState } from 'react';

import { getBlogsInServer } from '/actions/handleBlog';
import { getUserProfile } from '/actions/handleUser';
import { ManagementBlog } from '/components/blog';
import { ProtectRoute } from '/components/auth';

function Management({ token, profile }) {
	return (
		<ProtectRoute>
			{/* <ManagementBlog blogList={blogList} token={token} size={size} /> */}
			{JSON.stringify(profile)}
		</ProtectRoute>
	);
}

export default Management;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const profile = await getUserProfile(accessToken);

	return {
		props: {
			token: accessToken,
			profile,
		},
	};
}
