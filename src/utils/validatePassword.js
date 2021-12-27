export const validatePassword = (password) => {
	if (password === '') {
		return '不可以空白';
	} else if (password.search(/[A-Za-z0-9]{6,}/) === -1) {
		return '至少6碼';
	} else return '';
};
