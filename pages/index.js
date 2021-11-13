import { withRouter } from 'next/router';
import { HomeList } from '/components/home';
import { listAllInServer } from '/actions/handleBlog';

function Home({
	router,
	blogs,
	categories,
	tags,
	blogSize,
	limitNum,
	skipNum,
}) {
	return (
		<HomeList
			router={router}
			blogs={blogs}
			categories={categories}
			tags={tags}
			blogSize={blogSize}
			limitNum={limitNum}
			skipNum={skipNum}
		/>
	);
}

export default withRouter(Home);

export async function getServerSideProps() {
	const limit = 4,
		skip = 0;
	const data = await listAllInServer(limit, skip);

	return {
		props: {
			blogs: data.blogs,
			categories: data.categories,
			tags: data.tags,
			blogSize: data.size,
			limitNum: limit,
			skipNum: skip,
		},
	};
}
