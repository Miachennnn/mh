import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Verify = () => {
	return (
		<div className="box-wrapper">
			<div className="box-content">
				<div className="title" style={{ marginBottom: '26px' }}>
					Verify Your E-mail
				</div>
				<Box component="form" noValidate autoComplete="off">
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(6, 1fr)',
							gap: 2,
							marginBottom: 1
						}}
					>
						<TextField
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 1 }}
							sx={{ height: '70px' }}
							hiddenLabel
							variant="filled"
						/>
						<TextField style={{ borderRadius: '0px' }} hiddenLabel variant="filled" />
						<TextField hiddenLabel variant="filled" />
						<TextField hiddenLabel variant="filled" />
						<TextField hiddenLabel variant="filled" />
						<TextField hiddenLabel variant="filled" />
					</Box>
					<div style={{ marginBottom: '25px' }}>Please enter 6 digital code sent to XXX@gmail.com</div>
					<Button variant="contained" style={{ width: '60%', marginBottom: '12px' }}>
						VERIFY
					</Button>
					<Button variant="outlined" style={{ width: '60%' }}>
						RETRY
					</Button>
				</Box>
			</div>
		</div>
	);
};

export default Verify;
