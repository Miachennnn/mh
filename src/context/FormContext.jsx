import React, { useState } from 'react';

export const FormContext = React.createContext();

const FormContextProvier = (props) => {
	const [
		emailErr,
		setEmailErr
	] = useState('');

	const [
		usernameErr,
		setUsernameErr
	] = useState('');
	const [
		passwordErr,
		setPasswordErr
	] = useState('');
	const [
		passwordAgainErr,
		setPasswordAgainErr
	] = useState('');

	const [
		email,
		setEmail
	] = useState('');
	const [
		username,
		setUsername
	] = useState('');
	const [
		password,
		setPassword
	] = useState('');
	const [
		passwordAgain,
		setPasswordAgain
	] = useState('');

	const [
		errMsg,
		setErrMsg
	] = useState('');

	const clearAllState = () => {
		setEmailErr('');
		setUsernameErr('');
		setPasswordAgainErr('');
		setPasswordErr('');
		console('!');
	};

	return (
		<FormContext.Provider
			value={{
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
				setErrMsg,
				clearAllState
			}}
		>
			{props.children}
		</FormContext.Provider>
	);
};

export default FormContextProvier;
