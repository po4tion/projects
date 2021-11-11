import NextLink from 'next/link';
import Image from 'next/image';
import renderHTML from 'react-render-html';
import moment from 'moment';
import axios from 'axios';

import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import UpdateIcon from '@mui/icons-material/Update';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function BlogList({ blog }) {
	const getImage = async blog => {
		const result = await axios.get(
			`http://localhost:3000/api/blog/photo/${blog.slug}`
		);

		return result;
	};

	const categoryList = blog => {
		return blog.categories.map((cat, idx) => (
			<NextLink key={idx} href={`/categories/${cat.slug}`} passHref>
				<Chip color="primary" label={cat.name} sx={{ marginRight: 1 }} />
			</NextLink>
		));
	};

	const tagList = blog => {
		return blog.tags.map((tag, idx) => (
			<NextLink key={idx} href={`/tags/${tag.slug}`} passHref>
				<Chip color="secondary" label={tag.name} sx={{ marginRight: 1 }} />
			</NextLink>
		));
	};

	return (
		<div>
			<CssBaseline />
			<Grid item xs={12} mb={2}>
				<NextLink href={`/blogs/${blog.slug}`}>
					<CardActionArea component="div">
						<Card sx={{ display: 'flex' }}>
							<CardMedia
								component="img"
								sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
								image={`http://localhost:3000/api/blog/photo/${blog.slug}`}
								alt={blog.title}
							/>
							<CardContent sx={{ flex: 1 }}>
								<Typography component="h2" variant="h5">
									{blog.title}
								</Typography>

								<Typography variant="subtitle1" color="text.secondary">
									<Grid
										container
										sx={{ direction: 'row', alignItems: 'center' }}
									>
										{blog.postedBy.name} &nbsp;
										<UpdateIcon fontSize="small" />
										{moment(blog.updatedAt).fromNow()}
									</Grid>
								</Typography>
								<Stack direction="row">
									{categoryList(blog)}
									{tagList(blog)}
								</Stack>
								<Typography variant="subtitle1">
									{renderHTML(blog.excerpt)}
								</Typography>
							</CardContent>
						</Card>
					</CardActionArea>
				</NextLink>
			</Grid>
		</div>
	);
}

export default BlogList;
