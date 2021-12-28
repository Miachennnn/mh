import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { validatePassword, validateEmail } from '../utils';
import { useNavigate } from 'react-router-dom';

const authentication = getAuth();

const Login = () => {
	let navigate = useNavigate();
	const handleClick = async (e) => {
		const db = getFirestore();
		e.preventDefault();
		if (password && email) {
			if (emailErr === '' && passwordErr === '') {
				try {
					const response = await signInWithEmailAndPassword(authentication, email, password);
					if (response.user.emailVerified) {
						const docRef = doc(db, 'users', email);
						const docSnap = await getDoc(docRef);
						if (docSnap.exists()) {
							sessionStorage.setItem('AuthToken', response._tokenResponse.refreshToken);
							sessionStorage.setItem('username', docSnap.data().username);
							navigate('/');
						}
					} else {
						setErrMsg('該帳號尚未通過驗證，請先到信箱驗證');
					}
				} catch (err) {
					setErrMsg(err.code);
				}
			} else setErrMsg('');
		} else setErrMsg('欄位請勿空白');
	};
	const {
		email,
		setEmail,
		password,
		setPassword,
		emailErr,
		setEmailErr,
		passwordErr,
		setPasswordErr,
		errMsg,
		setErrMsg,
		clearAllState
	} = useContext(FormContext);
	return (
		<div className="box-wrapper">
			<div className="box-content">
				<div className="title">Login</div>
				<Box sx={{ m: 1 }} component="form" noValidate autoComplete="off">
					<TextField
						fullWidth
						margin="normal"
						required
						id="email"
						label="Account"
						onChange={(e) => setEmail(e.target.value)}
						helperText={emailErr}
						error={emailErr ? true : false}
						onBlur={(e) => {
							setEmailErr(validateEmail(e.target.value));
						}}
					/>
					<TextField
						fullWidth
						margin="normal"
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
					<Link className="left link" to="/forgot" onClick={() => clearAllState()}>
						Forgot password?
					</Link>
					<Link className="right link" to="/signup" onClick={() => clearAllState()}>
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
