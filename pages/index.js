import { withRouter } from 'next/router';
import { HomeList } from '/components/home';
import { getBlogsInServer } from '/actions/handleBlog';
import { getTagList } from '/actions/handleTag';

function Home({ router, blogs, size, limit, skip, tags }) {
	return (
		<HomeList
			router={router}
			blogs={blogs}
			blogSize={size}
			limitNum={limit}
			skipNum={skip}
		/>
	);
}

export default withRouter(Home);

export async function getServerSideProps() {
	const tags = await getTagList();
	const limit = 4,
		skip = 0;
	const data = await getBlogsInServer(limit, skip);

	return {
		props: {
			tags,
			blogs: data.blogs,
			size: data.size,
			limit,
			skip,
		},
	};
}
