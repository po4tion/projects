import { HomeList } from '/components/home';
import { getBlogsInServer } from '/actions/handleBlog';
import { getTagList } from '/actions/handleTag';
import Head from 'next/head';

function Home({ blogs, limit, skip }) {
	return <HomeList blogs={blogs} limitNum={limit} skipNum={skip} />;
}

export default Home;

export async function getStaticProps() {
	// populate[tags] 작동하기 위해 최소 한번 실행
	const tags = await getTagList();
	const limit = 8,
		skip = 0;
	const data = await getBlogsInServer(limit, skip);

	return {
		props: {
			blogs: data.blogs,
			limit,
			skip,
		},
		revalidate: 1,
	};
}
