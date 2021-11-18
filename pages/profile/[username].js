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

export async function getServerSideProps(ctx) {
	const data = await getUserBlogs(encodeURI(ctx.params.username));

	return {
		props: {
			blogs: data.blogs,
			user: data.user,
		},
	};
}
