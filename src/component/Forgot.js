import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { onInputChange } from '../utils';
import { FormContext } from '../context/FormContext';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import BackBtn from './BackBtn';

const authentication = getAuth();
const Forgot = () => {
	const [
		next,
		setNext
	] = useState(false);
	const [
		errMsg,
		setErrMsg
	] = useState('');
	const handleClick = async (e) => {
		const digital = Math.floor(100000 + Math.random() * 900000);
		e.preventDefault();
		if (formState.email.val) {
			if (formState.email.err === '') {
				const actionCodeSettings = {
					url: `https://stoic-rosalind-82d01d.netlify.app/${digital}&${formState.email.val}` //偷帶驗證碼
				};
				sendPasswordResetEmail(authentication, formState.email.val, actionCodeSettings)
					.then((response) => {
						setNext(true);
					})
					.catch((error) => {
						setErrMsg(error.code);
					});
			} else setErrMsg('');
		} else setErrMsg('欄位請勿空白');
	};
	const { formState, dispatch } = useContext(FormContext);

	const form = (
		<Box component="form" noValidate autoComplete="off">
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="email"
				label="Account"
				value={formState.email.val}
				onChange={(e) => {
					onInputChange('email', e.target.value, dispatch, formState);
				}}
				onBlur={(e) => {
					onInputChange('email', e.target.value, dispatch, formState);
				}}
				helperText={formState.email.err}
				error={formState.email.isErr}
			/>

			<Button onClick={(e) => handleClick(e)} type="submit" variant="contained" fullWidth margin="normal">
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
