import { useState, useEffect } from 'react';

import { getBlogsInServer } from '/actions/handleBlog';
import { isAuth } from '/actions/handleAuth';
import { ManagementBlog } from '/components/blog';
import { ProtectRoute } from '/components/auth';

function Management({ token, blogLists }) {
	return (
		<ProtectRoute>
			<ManagementBlog
				blogList={blogLists}
				token={token}
				size={blogLists.data.length}
			/>
		</ProtectRoute>
	);
}

export default Management;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const blogLists = await getBlogsInServer(encodeURI(ctx.params.username));

	return {
		props: {
			token: accessToken,
			blogLists,
		},
	};
}
