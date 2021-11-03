import { ProtectRoute } from '/components/auth';

function User() {
	return (
		<ProtectRoute>
			<p>유저 페이지</p>
		</ProtectRoute>
	);
}

export default User;
