import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Body } from '/components';
import { getBlogInServer, blogRelatedInServer } from '/actions/handleBlog';
import { OneBlog } from '/components/blog';
import { getTagList } from '/actions/handleTag';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function Blogs({ blog, related }) {
	const router = useRouter();

	if (blog.data.length === 0) {
		const handleClick = () => {
			router.back();
		};

		return (
			<Body>
				<Alert severity="error" sx={{ mb: 2 }}>
					해당 포스트는 작성자가 삭제한 상태입니다
				</Alert>
				<Button variant="outlined" onClick={handleClick}>
					뒤로가기
				</Button>
			</Body>
		);
	}

	return <>{<OneBlog blog={blog} related={related} />}</>;
}

export default Blogs;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const tags = await getTagList();
	const blog = await getBlogInServer(encodeURIComponent(ctx.params.slug));
	const related = await blogRelatedInServer(blog.data[0]);

	return {
		props: {
			blog,
			related,
		},
		revalidate: 10,
	};
}
