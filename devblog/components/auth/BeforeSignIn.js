/* 
	Connect: user/beforeCheck/[id].js
*/

import { useState } from 'react';
import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signupAxios } from '/actions/handleAuth';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function BeforeSignIn({ params }) {
	const router = useRouter();
	const [error, setError] = useState('');

	const handleClick = async () => {
		await signupAxios({ token: params }).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				router.replace('/signin');
			}
		});
	};

	return (
		<>
			<Body maxWidth="xs">
				{error && (
					<Alert severity="error" sx={{ width: '100%' }}>
						{error}&nbsp;
						<NextLink href="/signup" passHref>
							<Link underline="hover">회원가입</Link>
						</NextLink>
					</Alert>
				)}
				<Typography sx={{ mb: 2 }}>
					본인인증을 완료하시려면 아래의 버튼을 클릭하세요
				</Typography>
				<Button
					disabled={error ? true : false}
					onClick={handleClick}
					variant="contained"
				>
					본인인증 완료
				</Button>
			</Body>
		</>
	);
}

export default BeforeSignIn;
