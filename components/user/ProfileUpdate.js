import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { updateLocalStorage } from '/actions/handleAuth';
import { updateUserProfile, removeProfileImg } from '/actions/handleUser';
import { photoResize } from '/lib/photoResize';
import axios from 'axios';

import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Divider from '@mui/material/Divider';

function ProfileUpdate({ token, profile }) {
	const router = useRouter();
	const matches = useMediaQuery('(max-width: 650px)', { noSsr: true });

	const [info, setInfo] = useState({
		password: '',
		error: '',
		loading: false,
		photoError: false,
	});

	const [textLength, setTextLength] = useState('');
	const [unLength, setUnLength] = useState('');
	const [pwdLength, setPwdLength] = useState('');

	const [data, setData] = useState('');
	const [photoData, setPhotoData] = useState('');

	useEffect(() => {
		setData(new FormData());
		setPhotoData(new FormData());
	}, []);

	useEffect(() => {
		if (profile.about) {
			setTextLength(profile.about);
		}

		if (profile.username) {
			setUnLength(profile.username);
		}
	}, [profile]);

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
				photoData.set('photo', resizeFile); // blob data 전달

				setInfo({
					...info,
					photoError: '',
				});

				setPhotoData(photoData);

				await updateUserProfile(photoData, token).then(data => {
					if (data.error) {
						setInfo({
							...info,
							photoError: '업로드 불가',
						});
					} else {
						setInfo({
							...info,
							photoError: false,
						});

						router.replace(router.asPath);
					}
				});
			}
		}
	};

	const handleThings = key => e => {
		const { value } = e.target;

		if (key === 'about') {
			if (value.length < 151) {
				setTextLength(value);
				data.set(key, value);
				setInfo({
					...info,
					error: '',
					[key]: value,
				});
			}
		}

		if (key === 'username') {
			if (value.length < 33) {
				setUnLength(value);
				data.set(key, value);
				setInfo({
					...info,
					error: '',
					[key]: value,
				});
			}
		}

		if (key === 'password') {
			if (value.length < 33) {
				setPwdLength(value);
				data.set(key, value);
				setInfo({
					...info,
					error: '',
					[key]: value,
				});
			}
		}
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
					});

					router.replace(router.asPath);
				});
			}
		});
	};

	const handleProfileImg = () => {
		removeProfileImg(profile.username).then(data => {
			setImg(undefined);
			router.replace(router.asPath);
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

				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Avatar
						alt="profile image"
						sx={{
							width: 150,
							height: 150,
							mb: 2,
						}}
					>
						<PersonOutlineIcon sx={{ width: 150, height: 150 }} />
						{img && (
							<Image
								priority
								src={img}
								alt="profile image"
								layout="fill"
								objectFit="cover"
								quality={100}
							/>
						)}
					</Avatar>

					<label style={{ width: 150 }}>
						<Input
							onChange={handleChange}
							type="file"
							inputProps={{ accept: 'image/png, image/jpeg' }}
							sx={{ display: 'none' }}
						/>

						<Button
							fullWidth
							color="primary"
							variant="contained"
							component="span"
							sx={{ maxWidth: 150, mb: 0.3 }}
						>
							이미지 업로드
						</Button>
					</label>
					<Button
						fullWidth
						color="primary"
						variant="outlined"
						component="span"
						onClick={handleProfileImg}
						sx={{ width: 150, maxWidth: 150 }}
					>
						이미지 삭제
					</Button>
				</Box>
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
				}}
			>
				<Box sx={{ width: '100%', mt: 1 }}>
					<Grid container spacing={2} mb={4}>
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
						<Grid item xs={matches ? 12 : 3}>
							{handlePhotoForm()}
						</Grid>
						<Grid item xs={1}>
							<Divider orientation="vertical" width={1} />
						</Grid>
						<Grid item xs={matches ? 11 : 8}>
							<Typography variant="h4" fontWeight="bold" mb={2}>
								{profile.name}
							</Typography>
							<Typography variant="body1">
								{profile.about ? profile.about : '자기소개를 입력해주세요'}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								onChange={handleThings('about')}
								value={textLength}
								fullWidth
								id="about"
								label="자기소개 수정"
								placeholder="자기소개를 입력해주세요"
								name="about"
								type="text"
								rows={4}
								multiline
							/>
						</Grid>

						<Typography sx={{ width: '100%' }} align="right">
							{textLength.length} / 150
						</Typography>

						<Grid item xs={12}>
							<TextField
								onChange={handleThings('username')}
								value={unLength}
								fullWidth
								id="username"
								label="별명 수정"
								placeholder="별명을 입력해주세요"
								name="username"
								type="text"
								error={info.error === 'username' ? true : false}
							/>
							<Typography sx={{ width: '100%' }} align="right">
								{unLength.length} / 32
							</Typography>
							{info.error === 'username' && (
								<Alert severity="error" sx={{ mt: '2px', width: '100%' }}>
									별명이 중복됩니다
								</Alert>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleThings('password')}
								value={pwdLength}
								fullWidth
								id="password"
								label="비밀번호 수정"
								placeholder="새로운 비밀번호를 입력해주세요(8자 이상)"
								name="password"
								type="password"
							/>
						</Grid>
						<Typography sx={{ width: '100%' }} align="right">
							{pwdLength.length} / 32
						</Typography>
						<Grid item xs={12}>
							<TextField
								defaultValue={profile.email}
								fullWidth
								id="email"
								label="이메일 수정불가"
								name="email"
								type="email"
								disabled
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button onClick={handleSubmit} type="button" variant="contained">
								수정하기
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Divider color="primary" sx={{ width: '100%' }} />
						</Grid>
						<Grid item xs={12}>
							<Alert severity="warning" sx={{ height: '100%' }}>
								경고! 회원탈퇴 후, 작성하신 모든 글이 삭제되며 회원 정보와 개인
								저작물은 복구되지 않습니다.
							</Alert>
						</Grid>
						<Grid
							item
							xs={12}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Link href="/deleteAccount" passHref>
								<Button color="warning" type="button" variant="outlined">
									회원탈퇴
								</Button>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default ProfileUpdate;
