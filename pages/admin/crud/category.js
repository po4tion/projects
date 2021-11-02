import axios from 'axios';
import { ProtectAdminRoute } from '/components/auth';
import { AdminCategory } from '/components/admin';
import { getCookie } from '/actions/handleAuth';

function Category({ accessToken }) {
	return (
		<ProtectAdminRoute>
			<AdminCategory accessToken={accessToken} />
		</ProtectAdminRoute>
	);
}

export default Category;

export async function getServerSideProps(ctx) {
	const { req } = await ctx;
	const accessToken = req.headers.cookie.slice(13);

	return { props: { accessToken } };
}
