import { ProtectRoute } from '/components/auth';
import { UpdatePost } from '/components/blog';
import { getCategoriesInServer } from '/actions/handleCategory';
import { getTagsInServer } from '/actions/handleTag';
import { getBlogInServer } from '/actions/handleBlog';

function UpdateBlog({ data }) {
	return (
		<ProtectRoute>
			<UpdatePost
				categories={data.categories.data}
				tags={data.tags.data}
				token={data.token}
				post={data.blog.data}
			/>
		</ProtectRoute>
	);
}

export default UpdateBlog;

export async function getServerSideProps(ctx) {
	const categories = await getCategoriesInServer();
	const tags = await getTagsInServer();
	const blog = await getBlogInServer(encodeURI(ctx.params.slug));

	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	return {
		props: { data: { categories, tags, blog, token: accessToken } },
	};
}
