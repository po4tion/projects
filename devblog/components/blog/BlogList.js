/* 
	Connect: HomeList, SearchBlog, TagRelated, Blogs
*/

import { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import dayjs from 'dayjs';

// MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

function BlogList({ blog, noLink = true }) {
	const [img, setImg] = useState(
		`${process.env.NEXT_PUBLIC_API}/images/loading.webp`
	);

	useEffect(() => {
		const modifyImg = async () => {
			const res = await axios.get(
				`/api/blog/homePhoto/${encodeURIComponent(blog.slug)}`
			);

			const trans = new Buffer.from(res.data.data.data).toString('base64');
			setImg(`data:image/jpeg;base64,${trans}`);
		};

		modifyImg();
	}, [blog]);

	return (
		<div>
			<CssBaseline />

			<Card
				sx={{
					maxWidth: 300,
					border: '1px solid lightgray',
					transition: 0.5,
					'&:hover': {
						transform: 'scale(0.98)',
					},
				}}
			>
				<CardActionArea>
					<NextLink href={`/blogs/${encodeURIComponent(blog.slug)}`} passHref>
						<CardMedia title={blog.title}>
							{img && (
								<Image
									src={img}
									width={300}
									height={250}
									objectFit="cover"
									quality={100}
									alt="썸네일 사진"
								/>
							)}
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
									maxWidth: '100%',
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
								<Link
									underline="hover"
									sx={{
										p: 0,
										m: 0,
										width: '50%',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis',
										display: 'flex',
									}}
								>
									<PersonIcon />
									{blog.postedBy.username}
								</Link>
							</NextLink>{' '}
							&nbsp;
						</>
					)}

					<Typography sx={{ display: 'inline-flex', userSelect: 'none' }}>
						{dayjs(blog.updatedAt).format('YY년 MM월 DD일')}
					</Typography>
				</Box>
			</Card>
		</div>
	);
}

export default BlogList;
