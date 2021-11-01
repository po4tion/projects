import { ProtectAdminRoute } from '/components/auth';
import { AdminCategory } from '/components/admin';

function Category() {
	return (
		<ProtectAdminRoute>
			<AdminCategory />
		</ProtectAdminRoute>
	);
}

export default Category;
