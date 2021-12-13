/* 
	Connect: admin/contact.js
*/

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { contactValidation } from '/lib/contactValidation';
import { contactUs } from '/actions/handleContact';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function AdminContact() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(contactValidation),
	});

	const onSubmit = async data => {
		const { name, email, message } = data;

		await contactUs({ name, email, message }).then(data => {
			setOpen(true);
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const moveHome = () => {
		router.replace('/');
	};

	return (
		<Body>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography>답변기간은 평균 1 ~ 3일 입니다</Typography>
					<Button onClick={moveHome} variant="outlined">
						홈으로
					</Button>
				</Box>
			</Modal>
			<Typography component="h1" variant="h5">
				운영자 문의
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
					<Button
						onClick={handleSubmit(onSubmit)}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						문의하기
					</Button>
				</Grid>
			</Box>
		</Body>
	);
}

export default AdminContact;
