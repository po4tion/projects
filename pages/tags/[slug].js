import { TagRelated } from '/components/tag';
import { getTagInServer } from '/actions/handleTag';

function Tags({ tag, blogs }) {
	return (
		<>
			<TagRelated tag={tag} blogs={blogs} />
		</>
	);
}

export default Tags;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const res = await getTagInServer(encodeURI(ctx.params.slug));

	return {
		props: {
			tag: res.tag,
			blogs: res.blogs,
		},
	};
}
