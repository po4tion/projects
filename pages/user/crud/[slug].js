/* 
	포스트 수정 페이지
*/

import { useState, useEffect } from 'react';
import { ProtectRoute } from '/components/auth';
import { UpdatePost } from '/components/blog';
import { getBlogInServer } from '/actions/handleBlog';
import { isAuth } from '/actions/handleAuth';

// MUI
import { Body } from '/components';
import Alert from '@mui/material/Alert';

function UpdateBlog({ blog, token }) {
	const [userEmail, setUserEmail] = useState('user');
	const [postEmail, setPostEmail] = useState('post');

	useEffect(() => {
		isAuth() && setUserEmail(isAuth().email);
		setPostEmail(blog.data[0].postedBy.email);
	}, [blog]);

	if (userEmail === postEmail) {
		return (
			<ProtectRoute>
				<UpdatePost token={token} post={blog.data[0]} />
			</ProtectRoute>
		);
	} else {
		return (
			<Body>
				<Alert severity="warning">허용되지 않은 사용자입니다</Alert>
			</Body>
		);
	}
}

export default UpdateBlog;

export async function getServerSideProps(ctx) {
	const blog = await getBlogInServer(encodeURIComponent(ctx.params.slug));

	const { req } = ctx;
	const accessToken = req.headers.cookie ? req.headers.cookie.slice(13) : '';

	return {
		props: { blog, token: accessToken },
	};
}
