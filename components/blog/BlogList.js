import NextLink from 'next/link';
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
import Link from '@mui/material/Link';

function BlogList({ blog, noLink = true }) {
	const tagList = blog => {
		return blog.tags.map((tag, idx) => (
			<NextLink
				key={idx}
				href={`/tags/${encodeURIComponent(tag.slug)}`}
				passHref
			>
				<Chip color="secondary" label={tag.name} sx={{ mr: 0.5, mb: 0.5 }} />
			</NextLink>
		));
	};

	return (
		<div>
			<CssBaseline />
			<Grid item xs={12} mb={2}>
				<NextLink href={`/blogs/${blog.slug}`} passHref>
					<CardActionArea component="div">
						<Card sx={{ display: 'flex', width: '600px', height: '400px' }}>
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
										{noLink && (
											<>
												<NextLink
													href={`/profile/${encodeURIComponent(
														blog.postedBy.username
													)}`}
													passHref
												>
													<Link underline="hover">
														{blog.postedBy.username}
													</Link>
												</NextLink>{' '}
												&nbsp;
											</>
										)}
										<UpdateIcon fontSize="small" />
										{moment(blog.updatedAt).fromNow()}
									</Grid>
								</Typography>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										{tagList(blog)}
									</Grid>
								</Grid>
								<Box>{blog.excerpt}</Box>
							</CardContent>
						</Card>
					</CardActionArea>
				</NextLink>
			</Grid>
		</div>
	);
}

export default BlogList;
