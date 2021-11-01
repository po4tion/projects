import { ProtectAdminRoute } from '/components/auth';
import { Main } from '/components/admin';

function Admin() {
	return (
		<ProtectAdminRoute>
			<Main />
		</ProtectAdminRoute>
	);
}

export default Admin;
