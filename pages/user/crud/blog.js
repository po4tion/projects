import { Main } from '/components/blog';
import { ProtectRoute } from '/components/auth';

function CreateBlog({ token }) {
	return (
		<ProtectRoute>
			<Main token={token} />
		</ProtectRoute>
	);
}

export default CreateBlog;

export async function getServerSideProps(ctx) {
	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	return {
		props: { token: accessToken },
	};
}
