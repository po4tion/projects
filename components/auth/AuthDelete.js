import { useState, useEffect } from 'react';
import { getCookie, deleteUserInfo, signoutAxios } from '/actions/handleAuth';
import { useRouter } from 'next/router';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function AuthDelete() {
	const router = useRouter();
	const [token, setToken] = useState('');

	useEffect(() => {
		setToken(getCookie('access-token'));
	}, []);

	const handleDelete = async () => {
		await deleteUserInfo(token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data);
				signoutAxios(() => router.replace('/signin'));
			}
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 6,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography sx={{ mb: 2 }}>
					아래 버튼을 눌러 회원탈퇴를 진행해주세요.
				</Typography>
				<Alert severity="warning" sx={{ width: '100%', mb: 2 }}>
					주의! 회원 탈퇴 이후 정보를 복구할 수 없습니다.
				</Alert>
				<Button variant="contained" onClick={handleDelete}>
					회원 정보 삭제
				</Button>
			</Box>
		</Container>
	);
}

export default AuthDelete;
