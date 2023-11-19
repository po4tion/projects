/* 
	Connect: deleteAccount.js
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie, deleteUserInfo, signoutAxios } from '/actions/handleAuth';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function AuthDelete() {
	const router = useRouter();
	const [token, setToken] = useState('');

	useEffect(() => {
		setToken(getCookie('access-token'));
	}, []);

	const handleDelete = async () => {
		await deleteUserInfo(token).then(data => {
			if (data.error) {
				return;
			} else {
				signoutAxios(() => router.replace('/signin'));
			}
		});
	};

	return (
		<Body maxWidth="xs">
			<Typography sx={{ mb: 2 }}>
				아래 버튼을 눌러 회원탈퇴를 진행해주세요.
			</Typography>
			<Alert severity="warning" sx={{ width: '100%', mb: 2 }}>
				주의! 회원 탈퇴 이후 정보를 복구할 수 없습니다.
			</Alert>
			<Button variant="contained" onClick={handleDelete}>
				회원 정보 삭제
			</Button>
		</Body>
	);
}

export default AuthDelete;
