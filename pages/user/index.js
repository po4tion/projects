import { ProtectRoute } from '/components/auth';
import { Main } from '/components/user';

function User() {
	return (
		<ProtectRoute>
			<Main />
		</ProtectRoute>
	);
}

export default User;
