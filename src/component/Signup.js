import React, { useContext, useState } from 'react';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContext } from '../context/FormContext';
import { validatePassword, validateEmail, validateUsername, validatePasswordAgain } from '../utils';
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import BackBtn from './BackBtn';
const authentication = getAuth();

const Signup = () => {
	const [
		next,
		setNext
	] = useState(false);

	const {
		email,
		setEmail,
		username,
		setUsername,
		password,
		setPassword,
		passwordAgain,
		setPasswordAgain,
		emailErr,
		setEmailErr,
		usernameErr,
		setUsernameErr,
		passwordErr,
		setPasswordErr,
		passwordAgainErr,
		setPasswordAgainErr,
		errMsg,
		setErrMsg
	} = useContext(FormContext);
	const form = (
		<Box component="form" noValidate autoComplete="off">
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="email"
				label="E-mail"
				onChange={(e) => setEmail(e.target.value)}
				helperText={emailErr}
				error={emailErr ? true : false}
				onBlur={(e) => {
					setEmailErr(validateEmail(e.target.value));
				}}
			/>
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="username"
				label="User name"
				onChange={(e) => setUsername(e.target.value)}
				helperText={usernameErr}
				error={usernameErr ? true : false}
				onBlur={(e) => {
					setUsernameErr(validateUsername(e.target.value));
				}}
			/>
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="password"
				label="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				helperText={passwordErr}
				error={passwordErr ? true : false}
				onBlur={(e) => {
					setPasswordErr(validatePassword(e.target.value));
				}}
			/>
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="passwordAgain"
				label="Password again"
				type="password"
				onChange={(e) => setPasswordAgain(e.target.value)}
				helperText={passwordAgainErr}
				error={passwordAgainErr ? true : false}
				onBlur={(e) => {
					setPasswordAgainErr(validatePasswordAgain(password, e.target.value));
				}}
			/>
			<Button
				onClick={(e) => handleClick(e)}
				type="submit"
				variant="contained"
				style={{ width: '100%', marginBottom: '24px' }}
			>
				SIGNIN
			</Button>
			<div className="errMsg">{errMsg}</div>
		</Box>
	);

	const handleClick = async (e) => {
		e.preventDefault();
		const formData = [
			email,
			password,
			username,
			passwordAgain
		];
		const formValidation = [
			emailErr,
			passwordErr,
			usernameErr,
			passwordAgainErr
		];
		const notEmpty = (currentValue) => currentValue !== ''; //檢查不為空值
		const notError = (currentValue) => currentValue === ''; //檢查沒有錯誤

		if (formData.every(notEmpty)) {
			if (formValidation.every(notError)) {
				const db = getFirestore();
				const response = await createUserWithEmailAndPassword(authentication, email, password);
				try {
					await setDoc(doc(collection(db, 'users'), email), {
						email: email,
						username: username,
						password: password
					});
					const actionCodeSettings = {
						url: 'https://stoic-rosalind-82d01d.netlify.app/login'
					};
					await sendEmailVerification(response.user, actionCodeSettings);
					setNext(true);
				} catch (e) {
				}
			} else setErrMsg('請檢查欄位格式');
		} else setErrMsg('欄位不可以空白');
	};
	return (
		<div className="box-wrapper">
			<BackBtn />
			<div className="box-content">
				<div className="title" style={{ marginBottom: '26px' }}>
					Signup
				</div>
				{!next && form}
				{next && 'Send confirm to your E-mail aleardy'}
			</div>
		</div>
	);
};

export default Signup;
