import { ProtectRoute } from '/components/auth';
import { UpdatePost } from '/components/blog';
import { getBlogInServer } from '/actions/handleBlog';

function UpdateBlog({ blog, token }) {
	return (
		<ProtectRoute>
			<UpdatePost token={token} post={blog.data[0]} />
		</ProtectRoute>
	);
}

export default UpdateBlog;

export async function getServerSideProps(ctx) {
	const blog = await getBlogInServer(encodeURIComponent(ctx.params.slug));

	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	return {
		props: { blog, token: accessToken },
	};
}
