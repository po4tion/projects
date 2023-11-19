/* 
	Connect: profile/[username].js
*/

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { contactValidation } from '/lib/contactValidation';
import { contactAuthor } from '/actions/handleContact';

// MUI
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { BlogList } from '/components/blog';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Blogs({ blogs, user }) {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [checked, setChecked] = useState(false);
	const [img, setImg] = useState(undefined);

	useEffect(() => {
		const modifyImg = async () => {
			const res = await axios.get(
				`/api/user/photo/${encodeURIComponent(user.username)}`
			);

			const trans = await new Buffer.from(res.data.data.data).toString(
				'base64'
			);

			setImg(`data:image/jpeg;base64,${trans}`);
		};

		modifyImg();
	}, [user]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(contactValidation),
	});

	// 해당 사용자의 정보
	const userInfo = useCallback(() => {
		const handleSwitch = () => {
			setChecked(!checked);
		};

		const handleAbout = () => {
			return (
				<Paper
					elevation={0}
					sx={{ p: 2, bgcolor: 'grey.100', width: 350, minWidth: 350 }}
				>
					<Typography variant="body1">{user.about}</Typography>
				</Paper>
			);
		};

		const sliceFirstUsername = () => {
			const userName = user.username;
			const firstWord = userName.slice(0, 1);

			return firstWord;
		};

		return (
			<>
				<Avatar sx={{ width: 100, height: 100, marginBottom: 2 }}>
					{img ? (
						<Image
							src={img}
							layout="fill"
							objectFit="cover"
							quality={100}
							alt="프로필 사진"
						/>
					) : (
						<Typography variant="h3">{sliceFirstUsername()}</Typography>
					)}
				</Avatar>

				<Typography variant="h5" sx={{ userSelect: 'none', mb: 2 }}>
					<b>{user.username}</b> 님의 포스트(총 {blogs.length} 개)
				</Typography>
				{handleAbout()}

				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								color="write"
								checked={checked}
								onChange={handleSwitch}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label="문의하기"
					/>
				</FormGroup>
			</>
		);
	}, [img, user.username, user.about, blogs.length, checked]);

	// 사용자의 포스트 표시
	const userBlog = useCallback(
		(start, end) => {
			const store = [];

			for (let i = start; i < end; i++) {
				if (blogs[i] === undefined) {
					break;
				}

				store.push(
					<Grid
						key={blogs[i].slug}
						xs={12}
						sm={6}
						md={3}
						lg={3}
						item
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<BlogList blog={blogs[i]} noLink={false} />
					</Grid>
				);
			}

			return store;
		},
		[blogs]
	);

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
			<NextSeo
				title={`${process.env.NEXT_PUBLIC_APP_NAME} | ${user.name}`}
				description={`${user.name}의 블로그`}
				canonical={`${process.env.NEXT_PUBLIC_API}/profile/${encodeURIComponent(
					user.username
				)}`}
				openGraph={{
					url: `${process.env.NEXT_PUBLIC_API}/profile/${encodeURIComponent(
						user.username
					)}`,
					title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${user.name}`,
					description: `${user.name}의 글이 숨쉬는 곳`,
					images: [
						{
							url: `${
								process.env.NEXT_PUBLIC_API
							}/api/user/photo/${encodeURIComponent(user.username)}`,
							width: 500,
							height: 500,
							alt: `${user.username}의 프로필 사진`,
							type: 'image/jpeg',
						},
					],
					site_name: process.env.NEXT_PUBLIC_APP_NAME,
				}}
			/>

			<Body maxWidth="lg">
				{userInfo()}

				<Divider variant="middle" sx={{ mb: 4, width: '100%' }} />
				{!checked && (
					<Grid container spacing={2}>
						{userBlog(4 * page - 4, 4 * page)}
					</Grid>
				)}
				{!checked && (
					<Stack spacing={2} sx={{ marginTop: 4 }}>
						<Pagination
							onChange={handleChange}
							page={page}
							count={Math.ceil(blogs.length / 4)}
						/>
					</Stack>
				)}
				{checked && (
					<>
						<Typography component="h1" variant="h5">
							<b>{user.username}</b>님에게 문의하기
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
								<Grid item xs={12}>
									<Button
										color="write"
										onClick={handleSubmit(onSubmit)}
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
									>
										문의하기
									</Button>
								</Grid>
							</Grid>
						</Box>
					</>
				)}
			</Body>
		</>
	);
}

export default Blogs;
