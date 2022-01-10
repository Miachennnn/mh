import React, { useContext, useState } from 'react';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContext } from '../context/FormContext';
import { formsValid, onInputChange } from '../utils';
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import BackBtn from './BackBtn';
import Loading from './Loading';
const authentication = getAuth();

const Signup = () => {
	//sending...
	const [
		isLoading,
		setIsLoading
	] = useState(false);
	//next page after POST
	const [
		next,
		setNext
	] = useState(false);
	//the error message after POST
	const [
		errMsg,
		setErrMsg
	] = useState('');
	//form state
	const { formState, dispatch } = useContext(FormContext);
	const form = (
		<Box component="form" noValidate autoComplete="off">
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="email"
				label="E-mail"
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
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="username"
				label="User name"
				value={formState.username.val}
				onChange={(e) => {
					onInputChange('username', e.target.value, dispatch, formState);
				}}
				onBlur={(e) => {
					onInputChange('username', e.target.value, dispatch, formState);
				}}
				helperText={formState.username.err}
				error={formState.username.isErr}
			/>
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="password"
				label="Password"
				type="password"
				value={formState.password.val}
				onChange={(e) => {
					onInputChange('password', e.target.value, dispatch, formState);
				}}
				onBlur={(e) => {
					onInputChange('password', e.target.value, dispatch, formState);
				}}
				helperText={formState.password.err}
				error={formState.password.isErr}
			/>
			<TextField
				style={{ width: '100%', marginBottom: '25px' }}
				required
				id="passwordAgain"
				label="Password again"
				type="password"
				value={formState.passwordAgain.val}
				onChange={(e) => {
					onInputChange('passwordAgain', e.target.value, dispatch, formState);
				}}
				onBlur={(e) => {
					onInputChange('passwordAgain', e.target.value, dispatch, formState);
				}}
				helperText={formState.passwordAgain.err}
				error={formState.passwordAgain.isErr}
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
		//the inputs needed in this page
		const formInputs = [
			'email',
			'username',
			'password',
			'passwordAgain'
		];
		// eslint-disable-next-line array-callback-return

		if (formsValid(formInputs, formState, dispatch)) {
			const { email, password, username } = formState;
			const db = getFirestore();
			try {
				setIsLoading(true);
				const response = await createUserWithEmailAndPassword(authentication, email.val, password.val);
				try {
					await setDoc(doc(collection(db, 'users'), email), {
						email: email.val,
						username: username.val,
						password: password.val
					});
					const actionCodeSettings = {
						url: 'https://stoic-rosalind-82d01d.netlify.app/login'
					};
					await sendEmailVerification(response.user, actionCodeSettings);
					setNext(true);
				} catch (e) {
					setIsLoading(false);
					setErrMsg(e.code);
				}
			} catch (err) {
				setIsLoading(false);
				setErrMsg(err.code);
			}
		}
	};
	if (isLoading) {
		return <Loading msg={'Sending...'} />;
	} else
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
