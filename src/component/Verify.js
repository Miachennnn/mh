import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Verify = () => {
	const rule = /http:\/\/[A-Za-z0-9:]{1,}\/([A-Za-z0-9:]{1,})/; //擷取網址後的digital
	const digital = getParameterByName('continueUrl')[0].match(rule)[1];
	const indexStart = getParameterByName('continueUrl')[0].match(rule).input.indexOf('&') + 1;
	const email = getParameterByName('continueUrl')[0]
		.match(rule)
		.input.slice(indexStart, getParameterByName('continueUrl')[0].match(rule).input.length);

	const digitalArray = digital.split('');
	console.log(window.location.search);
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
	// console.log(url);
	const { searchParams } = url;
	return searchParams.getAll(name);
}
