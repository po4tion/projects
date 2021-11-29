import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isAuth, updateLocalStorage } from '/actions/handleAuth';
import { updateUserProfile, getPhoto } from '/actions/handleUser';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function ProfileUpdate({ token, profile }) {
	const router = useRouter();
	const [photoRefresh, setPhotoRefresh] = useState(false);

	const [info, setInfo] = useState({
		username: '',
		email: '',
		about: '',
		password: '',
		photo: '',
		userInfo: '',
		error: '',
		loading: false,
		photoError: false,
	});

	const handleChange = key => e => {
		if (key === 'photo') {
			setPhotoRefresh(false);
		}

		const value = key === 'photo' ? e.target.files[0] : e.target.value;
		const userData = new FormData();

		if (key === 'photo' && e.target.files.length === 0) {
			URL.revokeObjectURL(info.photo);
			userData.set(key, undefined);

			setInfo({
				...info,
				[key]: '',
				userInfo: userData,
				photoError: false,
			});

			return;
		}

		if (key === 'photo' && e.target && e.target.files[0].size > 1500000) {
			URL.revokeObjectURL(info.photo);
			userData.set(key, undefined);

			setInfo({
				...info,
				photoError: true,
				[key]: '',
				userInfo: userData,
			});

			return;
		}

		userData.set(key, value);

		setInfo({
			...info,
			[key]: value,
			userInfo: userData,
			error: '',
			photoError: false,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setInfo({ ...info, loading: true });

		await updateUserProfile(info.userInfo, token).then(data => {
			if (data.error) {
				if (data.error.keyPattern.username === 1) {
					setInfo({
						...info,
						error: 'username',
					});
				} else if (data.error.keyPattern.email === 1) {
					setInfo({
						...info,
						error: 'email',
					});
				}
			} else {
				updateLocalStorage(data, () => {
					setInfo({
						username: '',
						email: '',
						about: '',
						password: '',
						error: '',
						loading: false,
						photoError: false,
					});

					// 상단의 username 버튼 활성화를 위해 refresh, 사진은 브라우저 새로고침
					// if (info.photo) {
					// 	window.location.replace(router.asPath);
					// } else {
					// 	router.replace(router.asPath);
					// }
					URL.revokeObjectURL(info.photo);
					setPhotoRefresh(handlePhotoForm);
					router.replace(router.asPath);
				});
			}
		});
	};

	const handlePhotoForm = () => {
		const src = `${
			process.env.NEXT_PUBLIC_API
		}/api/user/photo/${encodeURIComponent(profile.username)}`;
		const myLoader = ({ src, width, quality }) => {
			return `${
				process.env.NEXT_PUBLIC_API
			}/api/user/photo/${encodeURIComponent(profile.username)}?w=${width}&q=${
				quality || 75
			}`;
		};

		// 사진의 용량은 1mb 이하여야 합니다
		return (
			<>
				{info.photoError && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								width: '300px',
								maxWidth: '300px',
								overflow: 'hidden',
								marginBottom: 1,
							}}
						>
							<Alert severity="error" sx={{ width: '100%' }}>
								사진은 1mb를 넘으면 안됩니다.
							</Alert>
						</Box>
					</Box>
				)}
				{!info.photo && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								width: '100%',
								maxWidth: '300px',
								height: '250px',
								maxHeight: '250px',
								overflow: 'hidden',
								marginBottom: 1,
							}}
						>
							<Image
								priority={true}
								loader={myLoader}
								quality={100}
								src={src}
								alt="profile image"
								width={300}
								height={250}
							/>
						</Box>
					</Box>
				)}
				{info.photo && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								width: '100%',
								maxWidth: '300px',
								height: '250px',
								maxHeight: '250px',
								overflow: 'hidden',
								marginBottom: 1,
							}}
						>
							<Image
								src={URL.createObjectURL(info.photo)}
								alt="#"
								width={300}
								height={250}
							/>
						</Box>
					</Box>
				)}
				<label
					style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
				>
					<Input
						onChange={handleChange('photo')}
						type="file"
						accept="image/*"
						sx={{ display: 'none' }}
					/>
					<Image
						src={`${
							process.env.NEXT_PUBLIC_API
						}/api/user/photo/${encodeURIComponent(profile.username)}`}
						alt="#"
						width={300}
						height={300}
					/>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						component="span"
						sx={{ maxWidth: '300px' }}
					>
						프로필 사진 등록(1mb 이하)
					</Button>
				</label>
			</>
		);
	};

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 6,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					border: '1px solid black',
				}}
			>
				<Typography variant="h4" align="left" sx={{ mb: 6, width: '100%' }}>
					{profile.name} 님의 프로필
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					novalidate
					sx={{ width: '100%', mt: 1 }}
				>
					<Grid container spacing={2}>
						{info.loading && (
							<Grid
								item
								xs={12}
								sx={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<CircularProgress />
							</Grid>
						)}
						<Grid item xs={12}>
							{photoRefresh || handlePhotoForm()}
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleChange('about')}
								defaultValue={profile.about}
								fullWidth
								id="about"
								label="자기소개 수정"
								name="about"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleChange('username')}
								defaultValue={profile.username}
								fullWidth
								id="username"
								label="별명 수정"
								name="username"
								type="text"
								error={info.error === 'username' ? true : false}
							/>
							{info.error === 'username' && (
								<Alert severity="error" sx={{ mt: '2px', width: '100%' }}>
									별명이 중복됩니다
								</Alert>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleChange('email')}
								defaultValue={profile.email}
								fullWidth
								id="email"
								label="이메일 수정"
								name="email"
								type="email"
								error={info.error === 'email' ? true : false}
							/>
							{info.error === 'email' && (
								<Alert severity="error" sx={{ mt: '2px', width: '100%' }}>
									이메일이 중복됩니다
								</Alert>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleChange('password')}
								value={info.password}
								fullWidth
								id="password"
								label="비밀번호 수정"
								name="password"
								type="password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						수정하기
					</Button>

					<Link href="/deleteAccount" passHref>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							size="medium"
							sx={{ ml: 0.5 }}
						>
							회원탈퇴
						</Button>
					</Link>
				</Box>
			</Box>
		</Container>
	);
}

export default ProfileUpdate;
