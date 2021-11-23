import { adminManageBlogs } from '/actions/handleBlog';
import { ManagementBlog } from '/components/blog';
import { ProtectAdminRoute } from '/components/auth';
import { signoutAxios } from '/actions/handleAuth';
import { withRouter } from 'next/router';

import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';

function Management({ router, blogList, token, size }) {
	if (blogList === 401) {
		signoutAxios(() => router.replace('/signin'));

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
		<ProtectAdminRoute>
			<ManagementBlog blogList={blogList} token={token} size={size} />
		</ProtectAdminRoute>
	);
}

export default withRouter(Management);

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	const blogList = await adminManageBlogs(accessToken).then(data => {
		if (data.status === 401) {
			return 401;
		}

		return data;
	});

	return {
		props: {
			blogList: blogList,
			token: accessToken,
			size: blogList === 401 ? 0 : blogList.size,
		},
	};
}
