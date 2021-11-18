import { useEffect, useState } from 'react';

import { getBlogsUsers } from '/actions/handleBlog';
import { ManagementBlog } from '/components/blog';
import { ProtectRoute } from '/components/auth';

function Management({ token, blogs, size }) {
	return (
		<ProtectRoute>
			<ManagementBlog blogList={blogs} token={token} size={size} />
		</ProtectRoute>
	);
}

export default Management;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const blogs = await getBlogsUsers(accessToken);

	return {
		props: {
			token: accessToken,
			blogs,
			size: blogs.data.length,
		},
	};
}
