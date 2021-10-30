import { ProtectAdminRoute } from '/components/auth';

function Admin() {
	return (
		<>
			<ProtectAdminRoute>
				<p>운영자 페이지</p>
			</ProtectAdminRoute>
		</>
	);
}

export default Admin;
