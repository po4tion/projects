import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import 'moment/locale/ko';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import UpdateIcon from '@mui/icons-material/Update';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function BlogList({ blog }) {
	const categoryList = blog => {
		return blog.categories.map((cat, idx) => (
			<Link key={idx} href={`/categories/${cat.slug}`} passHref>
				<Chip color="primary" label={cat.name} sx={{ marginRight: 1 }} />
			</Link>
		));
	};

	const tagList = blog => {
		return blog.tags.map((tag, idx) => (
			<Link key={idx} href={`/tags/${tag.slug}`} passHref>
				<Chip color="secondary" label={tag.name} sx={{ marginRight: 1 }} />
			</Link>
		));
	};

	return (
		<div>
			<CssBaseline />
			<Grid item xs={12} mb={2}>
				<Link href={`/blogs/${blog.slug}`} passHref>
					<CardActionArea component="div">
						<Card sx={{ display: 'flex' }}>
							<CardMedia
								component="img"
								sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
								image={`/api/blog/photo/${blog.slug}`}
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
								<Grid container spacing={1}>
									<Grid item xs={12}>
										{categoryList(blog)}
									</Grid>
									<Grid item xs={12}>
										{tagList(blog)}
									</Grid>
								</Grid>
								<Box>{renderHTML(blog.excerpt)}</Box>
							</CardContent>
						</Card>
					</CardActionArea>
				</Link>
			</Grid>
		</div>
	);
}

export default BlogList;
