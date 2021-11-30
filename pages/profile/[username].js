import { Blogs } from '/components/user';
import { getUserBlogs } from '/actions/handleUser';

function UserBlogs({ blogs, user }) {
	return (
		<>
			<Blogs blogs={blogs} user={user} />
		</>
	);
}

export default UserBlogs;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const data = await getUserBlogs(encodeURIComponent(ctx.params.username));

	return {
		props: {
			blogs: data.blogs,
			user: data.user,
		},
		revalidate: 10,
	};
}
