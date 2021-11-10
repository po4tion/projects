import { useState } from 'react';
import { listAllInServer } from '/actions/handleBlog';
import { BlogList } from '/components/blog';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Home({ blogs, categories, tags, blogSize, limitNum, skipNum }) {
	const [size, setSize] = useState(blogSize);
	const [limit, setLimit] = useState(limitNum);
	const [skip, setSkip] = useState(skipNum);
	const [loading, setLoading] = useState([]);

	const displayBlog = () => {
		return blogs.map((blog, idx) => {
			return (
				<article key={idx}>
					<BlogList blog={blog} />
				</article>
			);
		});
	};

	return (
		<Container component="main" maxWidth="xl">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{displayBlog()}
			</Box>
		</Container>
	);
}

export default Home;

export async function getServerSideProps() {
	const limit = 2,
		skip = 0;
	const data = await listAllInServer(limit, skip);

	return {
		props: {
			blogs: data.blogs,
			categories: data.categories,
			tags: data.tags,
			blogSize: data.size,
			limitNum: limit,
			skipNum: skip,
		},
	};
}
