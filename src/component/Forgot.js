import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { validateEmail } from '../utils';
import { FormContext } from '../context/FormContext';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import BackBtn from './BackBtn';

const authentication = getAuth();
const Forgot = () => {
	const [
		next,
		setNext
	] = useState(false);
	const handleClick = async (e) => {
		const digital = Math.floor(100000 + Math.random() * 900000);
		e.preventDefault();
		if (email) {
			if (emailErr === '') {
				const actionCodeSettings = {
					url: `https://stoic-rosalind-82d01d.netlify.app/${digital}&${email}` //偷帶驗證碼
				};
				sendPasswordResetEmail(authentication, email, actionCodeSettings)
					.then((response) => {
						setNext(true);
					})
					.catch((error) => {
						setErrMsg(error.code);
					});
			} else setErrMsg('');
		} else setErrMsg('欄位請勿空白');
	};
	const { email, setEmail, emailErr, setEmailErr, errMsg, setErrMsg } = useContext(FormContext);

	const form = (
		<Box component="form" noValidate autoComplete="off">
			<TextField
				fullWidth
				margin="normal"
				id="email"
				label="E-mail"
				onChange={(e) => setEmail(e.target.value)}
				helperText={emailErr}
				error={emailErr ? true : false}
				onBlur={(e) => {
					setEmailErr(validateEmail(e.target.value));
				}}
			/>

			<Button onClick={(e) => handleClick(e)} variant="contained" fullWidth margin="normal">
				SEND
			</Button>
			<div className="errMsg">{errMsg}</div>
		</Box>
	);
	return (
		<div className="box-wrapper">
			<BackBtn />
			<div className="box-content">
				<div className="title" style={{ marginBottom: '26px' }}>
					Forgot Password
				</div>
				{!next && form}
				{next && 'Already Send to this E-mail'}
			</div>
		</div>
	);
};

export default Forgot;
