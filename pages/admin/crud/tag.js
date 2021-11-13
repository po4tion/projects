import axios from 'axios';
import { ProtectAdminRoute } from '/components/auth';
import { AdminTag } from '/components/admin';

function Tag({ accessToken }) {
	return (
		<ProtectAdminRoute>
			<AdminTag accessToken={accessToken} />
		</ProtectAdminRoute>
	);
}

export default Tag;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	return { props: { accessToken } };
}
