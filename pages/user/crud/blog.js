import { Main } from '/components/blog';
import { ProtectRoute } from '/components/auth';
import { getCategoriesInServer } from '/actions/handleCategory';
import { getTagsInServer } from '/actions/handleTag';

function CreateBlog({ data }) {
	return (
		<ProtectRoute>
			<Main
				categories={data.categories.data}
				tags={data.tags.data}
				token={data.token}
			/>
		</ProtectRoute>
	);
}

export default CreateBlog;

export async function getServerSideProps(ctx) {
	const categories = await getCategoriesInServer();

	const tags = await getTagsInServer();

	const { req } = ctx;
	const accessToken = req.headers.cookie.slice(13);

	return {
		props: { data: { categories, tags, token: accessToken } },
	};
}
