import axios from 'axios';
import { ProtectAdminRoute } from '/components/auth';
import { AdminCategory } from '/components/admin';
import { getCategories } from '/actions/handleCategory';

function Category({ accessToken, categories }) {
	return (
		<ProtectAdminRoute>
			<AdminCategory accessToken={accessToken} categoryList={categories} />
		</ProtectAdminRoute>
	);
}

export default Category;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	const categories = await getCategories();

	return { props: { accessToken, categories } };
}
