import { ProtectRoute, AuthDelete } from '/components/auth';

function DeleteAccount() {
	return (
		<ProtectRoute>
			<AuthDelete />
		</ProtectRoute>
	);
}

export default DeleteAccount;
