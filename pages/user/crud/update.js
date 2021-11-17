import { ProtectRoute } from '/components/auth';
import { ProfileUpdate } from '/components/user';
import { getUserProfile } from '/actions/handleUser';

function User({ token, profile }) {
	return (
		<ProtectRoute>
			<ProfileUpdate token={token} profile={profile} />
		</ProtectRoute>
	);
}

export default User;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);
	const data = await getUserProfile(accessToken);

	return {
		props: { token: accessToken, profile: data.profile },
	};
}
