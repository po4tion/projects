import NextLink from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/ko';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

function BlogList({ blog, noLink = true }) {
	const handleImage = () => {
		const src = `${
			process.env.NEXT_PUBLIC_API
		}/api/blog/photo/${encodeURIComponent(blog.slug)}`;

		const myLoader = ({ src, width, quality }) => {
			return `${
				process.env.NEXT_PUBLIC_API
			}/api/blog/photo/${encodeURIComponent(blog.slug)}?w=${width}&q=${
				quality || 75
			}`;
		};

		return (
			<Image
				width={300}
				height={200}
				objectFit="cover"
				loader={myLoader}
				quality={100}
				src={src}
				alt="thumbnail image"
			/>
		);
	};

	return (
		<div>
			<CssBaseline />
			<Card raised sx={{ maxWidth: 300 }}>
				<CardActionArea>
					<NextLink href={`/blogs/${encodeURIComponent(blog.slug)}`} passHref>
						<CardMedia title={blog.title}>
							<div
								style={{
									position: 'relative',
									width: '100%',
									height: '100%',
								}}
							>
								{handleImage()}
							</div>
						</CardMedia>
					</NextLink>

					<NextLink href={`/blogs/${encodeURIComponent(blog.slug)}`} passHref>
						<CardContent sx={{ userSelect: 'none', height: 136 }}>
							<Typography
								gutterBottom
								variant="h6"
								component="div"
								sx={{ fontWeight: 'bold' }}
							>
								{blog.title}
							</Typography>

							<Typography
								gutterBottom
								variant="body2"
								component="div"
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
								}}
							>
								{blog.excerpt}
							</Typography>
						</CardContent>
					</NextLink>
				</CardActionArea>

				<Divider />

				<Box
					sx={{
						pr: 2,
						pl: 2,
						mt: 1.5,
						mb: 1.5,
						display: 'flex',
						justifyContent: noLink ? 'space-between' : 'flex-end',
					}}
				>
					{noLink && (
						<>
							<NextLink
								href={`/profile/${encodeURIComponent(blog.postedBy.username)}`}
								passHref
							>
								<Link underline="hover" sx={{ p: 0, m: 0, userSelect: 'none' }}>
									#{blog.postedBy.username}
								</Link>
							</NextLink>{' '}
							&nbsp;
						</>
					)}

					<Typography sx={{ display: 'inline-flex', userSelect: 'none' }}>
						{moment(blog.updatedAt).format('YYYY년 MM월 DD일')}
					</Typography>
				</Box>
			</Card>
		</div>
	);
}

export default BlogList;
