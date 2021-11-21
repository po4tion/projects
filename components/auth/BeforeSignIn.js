import { useState } from 'react';
import { useEffect } from 'react';
import { signupAxios } from '/actions/handleAuth';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

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
				</Box>
			</Container>
		</>
	);
}

export default BeforeSignIn;
