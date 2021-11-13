import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getBlogInServer } from '/actions/handleBlog';
import moment from 'moment';
import renderHTML from 'react-render-html';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Blogs({ router, blog }) {
	console.log(blog);
	const { title, sDesc, slug, postedBy, updatedAt, body } = blog.data;

	return (
		<>
			<Head>
				<title>
					{process.env.NEXT_PUBLIC_APP_NAME} | {title}
				</title>
				<meta name="description" content={sDesc} />
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_API}/blogs/${slug}`}
				/>
				<meta
					property="og:title"
					content={`${process.env.NEXT_PUBLIC_APP_NAME} | ${title}`}
				/>
				<meta property="og:description" content={sDesc} />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_API}/blogs/${slug}`}
				/>
				<meta
					property="og:site_name"
					content={process.env.NEXT_PUBLIC_APP_NAME}
				/>
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_API}/public/images/kuma.jpg`}
				/>
				<meta
					property="og:image:secure_url"
					content={`${process.env.NEXT_PUBLIC_API}/public/images/kuma.jpg`}
				/>
				<meta property="og:image:type" content="image/jpg" />
			</Head>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 6,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Grid container rowSpacing={2}>
						<Grid item xs={12}>
							<Typography component="h1" variant="h4" gutterBottom>
								{title}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6">
								{postedBy.name} | {moment(updatedAt).fromNow()}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Box>{renderHTML(body)}</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default withRouter(Blogs);

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const blog = await getBlogInServer(encodeURI(ctx.params.slug));

	return {
		props: {
			blog,
			revalidate: 60, // In 60 Seconds
		},
	};
}
