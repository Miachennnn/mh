import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Forgot = () => {
	return (
		<div className="box-wrapper">
			<div className="box-content">
				<div className="title" style={{ marginBottom: '26px' }}>
					Forgot Password
				</div>
				<Box component="form" noValidate autoComplete="off">
					<TextField style={{ width: '100%', marginBottom: '25px' }} id="email" label="E-mail" />

					<Button variant="contained" style={{ width: '100%', marginBottom: '24px' }}>
						SEND
					</Button>
				</Box>
			</div>
		</div>
	);
};

export default Forgot;
