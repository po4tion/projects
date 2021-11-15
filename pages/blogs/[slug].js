import { withRouter } from 'next/router';
import { getBlogInServer, blogRelatedInServer } from '/actions/handleBlog';
import { OneBlog } from '/components/blog';

function Blogs({ router, blog, related }) {
	return (
		<>
			<OneBlog router={router} blog={blog} related={related} />
		</>
	);
}

export default withRouter(Blogs);

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const blog = await getBlogInServer(encodeURI(ctx.params.slug));
	const related = await blogRelatedInServer(blog.data);

	return {
		props: {
			blog,
			revalidate: 5, // In 60 Seconds
			related,
		},
	};
}
