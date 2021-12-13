/* 
	작성한 포스트 관리 페이지
*/

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getBlogsUsers } from '/actions/handleBlog';
import { signoutAxios } from '/actions/handleAuth';
import { ManagementBlog } from '/components/blog';
import { ProtectRoute } from '/components/auth';

import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';

function Management({ token, blogs, size }) {
	const { replace } = useRouter();

	// 토큰 기간 만료 에러 처리
	if (blogs === 401) {
		signoutAxios(() => replace('/signin'));

		return (
			<Container component="main" maxWidth="md">
				<Box
					sx={{
						marginTop: 6,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Alert severity="warning">토큰이 만료되어 로그아웃 됩니다</Alert>
				</Box>
			</Container>
		);
	}

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
	const blogs = await getBlogsUsers(accessToken).then(data => {
		if (data.status === 401) {
			return 401;
		}

		return data;
	});

	return {
		props: {
			token: accessToken,
			blogs,
			size: blogs === 401 ? 0 : blogs.data.length,
		},
	};
}
