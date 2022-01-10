import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { formsValid, onInputChange, clearFormState } from '../utils';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const authentication = getAuth();

const Login = () => {
	let navigate = useNavigate();
	const [
		isLoading,
		setIsLoading
	] = useState(false);
	const [
		errMsg,
		setErrMsg
	] = useState('');
	const { formState, dispatch } = useContext(FormContext);
	const handleClick = async (e) => {
		const db = getFirestore();
		e.preventDefault();
		const formInputs = [
			'email',
			'password'
		];
		if (formsValid(formInputs, formState, dispatch)) {
			try {
				setIsLoading(true);
				const response = await signInWithEmailAndPassword(
					authentication,
					formState.email.val,
					formState.password.val
				);
				if (response.user.emailVerified) {
					const docRef = doc(db, 'users', formState.email.val);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						sessionStorage.setItem('AuthToken', response._tokenResponse.refreshToken);
						sessionStorage.setItem('username', docSnap.data().username);
						navigate('/');
					}
				} else {
					setIsLoading(false);
					setErrMsg('This account has not been verified, please check your email!');
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
				<div className="box-content">
					<div className="title">Login</div>
					<Box sx={{ m: 1 }} component="form" noValidate autoComplete="off">
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
						<Button
							onClick={(e) => handleClick(e)}
							type="submit"
							m={2}
							variant="contained"
							fullWidth
							margin="normal"
						>
							Login
						</Button>
						<Link
							className="left link"
							to="/forgot"
							onClick={() => {
								clearFormState(dispatch);
							}}
						>
							Forgot password?
						</Link>
						<Link
							className="right link"
							to="/signup"
							onClick={() => {
								clearFormState(dispatch);
							}}
						>
							Sign Up
						</Link>
						<div style={{ clear: 'both' }} />
						<div className="errMsg">{errMsg}</div>
					</Box>
				</div>
			</div>
		);
};

export default Login;
