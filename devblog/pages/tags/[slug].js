/* 
	해당 태그와 연관된 포스트들을 보여주는 페이지
*/

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
	const res = await getTagInServer(encodeURIComponent(ctx.params.slug));

	return {
		props: {
			tag: res.tag,
			blogs: res.blogs,
		},
		revalidate: 10,
	};
}
