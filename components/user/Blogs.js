import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BlogList } from '/components/blog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { contactValidation } from '/lib/contactValidation';
import { contactAuthor } from '/actions/handleContact';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

function Blogs({ blogs, user }) {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [checked, setChecked] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(contactValidation),
	});

	const userInfo = () => {
		return (
			<>
				<Typography variant="h5" sx={{ userSelect: 'none' }}>
					<b>{user.username}</b> 님의 포스트(총 {blogs.length} 개)
				</Typography>
				<Typography>문의하기</Typography>
				<Switch
					checked={checked}
					onChange={handleSwitch}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</>
		);
	};

	const handleSwitch = () => {
		setChecked(!checked);
	};

	const userBlog = (start, end) => {
		const store = [];

		for (let i = start; i < end; i++) {
			if (blogs[i] === undefined) {
				break;
			}
			store.push(
				<article key={i}>
					<BlogList blog={blogs[i]} noLink={false} />
				</article>
			);
		}

		return store;
	};

	const handleChange = (_, value) => {
		setPage(value);
	};

	const onSubmit = async data => {
		const { name, email, message } = data;

		await contactAuthor({ name, email, message, authorEmail: user.email }).then(
			data => {
				setValue('name', '');
				setValue('email', '');
				setValue('message', '');

				setChecked(!checked);
			}
		);
	};

	return (
		<>
			<Head>
				<title>
					{process.env.NEXT_PUBLIC_APP_NAME} | {user.name}
				</title>
				<meta name="description" content={`${user.name}님의 블로그`} />
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_API}/profile/${user.username}`}
				/>
				<meta
					property="og:title"
					content={`${process.env.NEXT_PUBLIC_APP_NAME} | ${user.name}`}
				/>
				<meta property="og:description" content={`${user.name}님의 블로그`} />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_API}/profile/${user.username}`}
				/>
				<meta
					property="og:site_name"
					content={process.env.NEXT_PUBLIC_APP_NAME}
				/>
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_API}/images/kuma.jpg`}
				/>
				<meta
					property="og:image:secure_url"
					content={`${process.env.NEXT_PUBLIC_API}/images/kuma.jpg`}
				/>
				<meta property="og:image:type" content="image/jpg" />
			</Head>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{userInfo()}
					<Divider variant="middle" sx={{ mt: 4, mb: 4, width: '100%' }} />

					{!checked && userBlog(5 * page - 5, 5 * page)}

					{!checked && (
						<Stack spacing={2} sx={{ marginTop: 4 }}>
							<Pagination
								onChange={handleChange}
								page={page}
								count={Math.ceil(blogs.length / 5)}
							/>
						</Stack>
					)}

					{checked && (
						<>
							<Typography component="h1" variant="h5">
								{user.username}님에게 문의하기
							</Typography>
							<Box component="form" novalidate sx={{ width: '100%', mt: 1 }}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											autoFocus
											defaultValue=""
											fullWidth
											id="name"
											label="성함 또는 별명을 입력해주세요"
											name="name"
											required
											type="text"
											{...register('name')}
											error={errors.name ? true : false}
										/>
										{errors.name && (
											<Alert severity="warning" sx={{ width: '100%' }}>
												{errors.name?.message}
											</Alert>
										)}
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											autoFocus
											defaultValue=""
											fullWidth
											id="email"
											label="이메일을 입력해주세요"
											name="email"
											required
											type="email"
											{...register('email')}
											error={errors.email ? true : false}
										/>
										{errors.email && (
											<Alert severity="warning" sx={{ width: '100%' }}>
												{errors.email?.message}
											</Alert>
										)}
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											autoFocus
											defaultValue=""
											fullWidth
											id="message"
											label="내용을 입력해주세요"
											name="message"
											required
											type="text"
											rows={4}
											multiline
											{...register('message')}
											error={errors.message ? true : false}
										/>
										{errors.message && (
											<Alert severity="warning" sx={{ width: '100%' }}>
												{errors.message?.message}
											</Alert>
										)}
									</Grid>
									<Button
										onClick={handleSubmit(onSubmit)}
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
									>
										문의하기
									</Button>
								</Grid>
							</Box>
						</>
					)}
				</Box>
			</Container>
		</>
	);
}

export default Blogs;
