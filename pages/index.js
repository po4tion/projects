import { withRouter } from 'next/router';
import { HomeList } from '/components/home';
import { getBlogsInServer } from '/actions/handleBlog';

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

export async function getServerSideProps() {
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
	};
}
