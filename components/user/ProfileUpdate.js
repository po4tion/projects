import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isAuth, updateLocalStorage } from '/actions/handleAuth';
import { updateUserProfile, getPhoto } from '/actions/handleUser';
import { photoResize } from '/lib/photoResize';
import axios from 'axios';

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

	const [info, setInfo] = useState({
		password: '',
		error: '',
		loading: false,
		photoError: false,
	});

	const [data, setData] = useState('');

	useEffect(() => {
		setData(new FormData());
	}, []);

	const [img, setImg] = useState(undefined);

	const modifyImg = async () => {
		const res = await axios.get(
			`/api/user/photo/${encodeURIComponent(profile.username)}`
		);

		const trans = new Buffer.from(res.data.data.data).toString('base64');
		setImg(`data:image/jpeg;base64,${trans}`);
	};

	useEffect(() => {
		modifyImg();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const handleChange = async e => {
		const { files } = e.target;

		if (files.length === 0) {
			return;
		} else {
			const value = files[0];
			const resizeFile = await photoResize(value);

			if (resizeFile.size >= 4000000) {
				setInfo({
					...info,
					photoError: '사진의 용량이 너무 큽니다',
				});
			} else {
				data.set('photo', resizeFile); // blob data 전달

				setInfo({
					...info,
					photoError: '',
					photo: resizeFile,
				});

				setData(data);
			}
		}
	};

	const handleThings = key => e => {
		const { value } = e.target;

		data.set(key, value);

		setInfo({
			...info,
			error: '',
			[key]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setInfo({ ...info, loading: true });

		await updateUserProfile(data, token).then(data => {
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
						password: '',
						error: '',
						loading: false,
						photoError: false,
					});

					URL.revokeObjectURL(info.photo);

					router.replace(router.asPath);
				});
			}
		});
	};

	const handlePhotoForm = () => {
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
							<Image src={img} alt="profile image" width={300} height={250} />
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
						onChange={handleChange}
						type="file"
						accept="image/*"
						sx={{ display: 'none' }}
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

				<Box sx={{ width: '100%', mt: 1 }}>
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
							{img && handlePhotoForm()}
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleThings('about')}
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
								onChange={handleThings('username')}
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
								onChange={handleThings('password')}
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
						onClick={handleSubmit}
						type="button"
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
