import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
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
import PersonIcon from '@mui/icons-material/Person';

function BlogList({ blog, noLink = true }) {
	const [img, setImg] = useState(<p>불러오는 중</p>);
	const router = useRouter();

	const handleImage = useCallback(() => {
		return (
			<Image
				width="300px"
				height="250px"
				objectFit="cover"
				quality={100}
				src={`${
					process.env.NEXT_PUBLIC_API
				}/api/blog/photo/${encodeURIComponent(blog.slug)}`}
				alt="thumbnail image"
			/>
		);
	}, [blog]);

	useEffect(() => {
		setImg(handleImage);
	}, [router, handleImage]);

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
						<CardMedia title={blog.title}>{img}</CardMedia>
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
						{moment(blog.updatedAt).format('YY년 MM월 DD일')}
					</Typography>
				</Box>
			</Card>
		</div>
	);
}

export default BlogList;
