import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Verify = () => {
	const tempUrlFromContinueUrl = new URL(getParameterByName('continueUrl')[0]);
	const hideInfoString = tempUrlFromContinueUrl.pathname.replace('/', '');
	const digital = hideInfoString.slice(0, 6);
	const email = hideInfoString.slice(7, hideInfoString.length);
	const digitalArray = digital.split('');

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
						{digitalArray.map((code, index) => {
							return (
								<TextField
									inputProps={{
										style: {
											fontSize: '42px',
											color: '#1976d2',
											height: '30px'
										},
										readOnly: true
									}}
									key={index}
									hiddenLabel
									variant="filled"
									defaultValue={code}
								/>
							);
						})}
					</Box>
					<div style={{ marginBottom: '25px' }}>Please enter 6 digital code sent to {email}</div>
					<Button
						onClick={() => {
							window.location.assign(
								`https://mether-affcb.firebaseapp.com/__/auth/action?mode=${getParameterByName(
									'mode'
								)}&oobCode=${getParameterByName('oobCode')}&apiKey=${getParameterByName('apiKey')}`
							);
						}}
						variant="contained"
						style={{ width: '60%', marginBottom: '12px' }}
					>
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

function getParameterByName(name) {
	const url = new URL(window.location);
	const { searchParams } = url;
	return searchParams.getAll(name);
}
