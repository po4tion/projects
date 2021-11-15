import { CtgRelated } from '/components/category';
import { getCategoryInServer } from '/actions/handleCategory';

function Categories({ category, blogs }) {
	return (
		<>
			<CtgRelated category={category} blogs={blogs} />
		</>
	);
}

export default Categories;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const res = await getCategoryInServer(encodeURI(ctx.params.slug));

	return {
		props: {
			category: res.category,
			blogs: res.blogs,
		},
	};
}
