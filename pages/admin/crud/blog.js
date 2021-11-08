import axios from 'axios';
import { Main } from '/components/blog';
import { getCategories } from '/actions/handleCategory';
import { getTags } from '/actions/handleTag';

function Blog({ data }) {
	return <Main categories={data.categories.data} tags={data.tags.data} />;
}

export default Blog;

export async function getServerSideProps() {
	const categories = await getCategories();

	const tags = await getTags();

	return { props: { data: { categories, tags } } };
}
