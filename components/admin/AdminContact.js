import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { contactValidation } from '/lib/contactValidation';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function AdminContact() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(contactValidation),
	});

	const onSubmit = e => {
		e.preventDefault();
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
				<Typography component="h1" variant="h5">
					이용자 문의
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
							가입하기
						</Button>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default AdminContact;
