import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isAuth, updateLocalStorage } from '/actions/handleAuth';
import {
	updateUserProfile,
	getPhoto,
	removeProfileImg,
} from '/actions/handleUser';
import { photoResize } from '/lib/photoResize';
import axios from 'axios';

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
		console.log('하이');
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
						photo: undefined,
					});

					URL.revokeObjectURL(info.photo);

					router.replace(router.asPath);
				});
			}
		});
	};

	const handleProfileImg = () => {
		removeProfileImg(profile.username).then(_ => {
			setInfo({
				...info,
				photo: undefined,
			});

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
						{!info.photo && img && (
							<Image priority src={img} alt="profile image" layout="fill" />
						)}
						{info.photo && (
							<Image
								src={URL.createObjectURL(info.photo)}
								alt="업로드 사진 미리보기"
								layout="fill"
							/>
						)}
					</Avatar>

					<label style={{ width: 150 }}>
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
						sx={{ maxWidth: 150 }}
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
						<Grid item xs={3}>
							{handlePhotoForm()}
						</Grid>
						<Grid item xs={1}>
							<Divider orientation="vertical" width={1} />
						</Grid>
						<Grid item xs={8}>
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
								defaultValue={profile.about}
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
						<Grid item xs={12}>
							<TextField
								onChange={handleThings('username')}
								defaultValue={profile.username}
								fullWidth
								id="username"
								label="별명 수정"
								placeholder="별명을 입력해주세요"
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
								onChange={handleThings('password')}
								value={info.password}
								fullWidth
								id="password"
								label="비밀번호 수정"
								placeholder="새로운 비밀번호를 입력해주세요"
								name="password"
								type="password"
							/>
						</Grid>
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
