import { withRouter } from 'next/router';
import { getBlogInServer, blogRelatedInServer } from '/actions/handleBlog';
import { OneBlog } from '/components/blog';
import { getTagList } from '/actions/handleTag';

function Blogs({ router, blog, related }) {
	return (
		<>
			<OneBlog router={router} blog={blog} related={related} />
		</>
	);
}

export default withRouter(Blogs);

export async function getServerSideProps(ctx) {
	const tags = await getTagList();
	const blog = await getBlogInServer(encodeURIComponent(ctx.params.slug));
	const related = await blogRelatedInServer(blog.data);

	return {
		props: {
			blog,
			related,
		},
	};
}
