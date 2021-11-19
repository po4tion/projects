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

export async function getServerSideProps(ctx) {
	const blog = await getBlogInServer(encodeURI(ctx.params.slug));
	const related = await blogRelatedInServer(blog.data);

	return {
		props: {
			blog,
			related,
		},
	};
}
