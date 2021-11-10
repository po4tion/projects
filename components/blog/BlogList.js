import NextLink from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';

import Link from '@mui/material/Link';

function BlogList({ blog }) {
	const categoryList = blog => {
		return blog.categories.map((cat, idx) => (
			<NextLink key={idx} href={`/categories/${cat.slug}`} passHref>
				<Link underline="hover" variant="body2">
					{cat.name}
				</Link>
			</NextLink>
		));
	};

	const tagList = blog => {
		return blog.tags.map((tag, idx) => (
			<NextLink key={idx} href={`/tags/${tag.slug}`} passHref>
				<Link underline="hover" variant="body2">
					{tag.name}
				</Link>
			</NextLink>
		));
	};

	return (
		<div>
			{categoryList(blog)}
			{tagList(blog)}
		</div>
	);
}

export default BlogList;
