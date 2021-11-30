import { withRouter } from 'next/router';
import { HomeList } from '/components/home';
import { getBlogsInServer } from '/actions/handleBlog';
import { getTagList } from '/actions/handleTag';
import Head from 'next/head';

function Home({ router, blogs, size, limit, skip }) {
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

export async function getStaticProps() {
	// populate[tags] 작동하기 위해 최소 한번 실행
	const tags = await getTagList();
	const limit = 4,
		skip = 0;
	const data = await getBlogsInServer(limit, skip);

	return {
		props: {
			blogs: data.blogs,
			size: data.size,
			limit,
			skip,
		},
		revalidate: 10,
	};
}
