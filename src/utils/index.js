export const validateEmail = (email) => {
	const Rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
	if (email.search(Rule) === -1) {
		return 'Invalid format';
	} else return '';
};
export const validatePassword = (password) => {
	if (password.search(/[A-Za-z0-9]{6,}/) === -1) {
		return 'Invalid format, 6 code at least';
	} else return '';
};
export const validatePasswordAgain = (passwordAgain, password) => {
	if (passwordAgain !== password) {
		return 'Is not matches the password';
	}
	return '';
};
export const onInputChange = (name, value, dispatch, state) => {
	let errMsg = validateInput(name, value, state);
	dispatch({
		type: 'UPDATE',
		name: name,
		data: { val: value, isErr: errMsg === '' ? false : true, err: errMsg, touched: true }
	});
};
export const validateInput = (inputName, inputValue, state) => {
	let errMsg = '';
	if (inputValue.trim() !== '') {
		switch (inputName) {
			case 'email':
				errMsg = validateEmail(inputValue);
				break;
			case 'username':
				errMsg = '';
				break;
			case 'password':
				errMsg = validatePassword(inputValue);
				break;
			case 'passwordAgain':
				errMsg = validatePasswordAgain(inputValue, state.password.val);
				break;
			default:
				break;
		}
	} else {
		errMsg = 'It can not be empty';
	}
	return errMsg;
};

export const formsValid = (formInputs, state, dispatch) => {
	let noError = true;
	formInputs.map((inputName) => {
		if (state[inputName].touched === false) {
			noError = false;
		} else {
			//make sure passwordAgain is matches with the password
			let ss = validateInput(inputName, state[inputName].val, state);
			if (ss !== '') {
				noError = false;
			}
		}
		onInputChange(inputName, state[inputName].val, dispatch, state);
	});
	return noError;
};

export const clearFormState = (dispatch) => {
	dispatch({ type: 'CLEAR' });
};
