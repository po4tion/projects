import { withRouter } from 'next/router';
import { ProtectRoute } from '/components/auth';
import { ProfileUpdate } from '/components/user';
import { getUserProfile } from '/actions/handleUser';
import { signoutAxios } from '/actions/handleAuth';

import Container from '@mui/material/Container';
import Box from '@mui/system/Box';

function User({ router, token, profile }) {
	if (profile === 401) {
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
					토큰이 만료되어 로그아웃 됩니다
				</Box>
			</Container>
		);
	}

	return (
		<ProtectRoute>
			<ProfileUpdate token={token} profile={profile} />
		</ProtectRoute>
	);
}

export default withRouter(User);

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const data = await getUserProfile(accessToken).then(data => {
		if (data.status === 401) {
			return 401;
		}

		return data;
	});

	return {
		props: { token: accessToken, profile: data === 401 ? 401 : data.profile },
	};
}
