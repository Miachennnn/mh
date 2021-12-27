export const validatePasswordAgain = (password, passwordAgain) => {
	if (passwordAgain === '') {
		return '不可以空白';
	} else if (password !== passwordAgain) {
		return '密碼與再次輸入密碼不相符';
	}
	return '';
};
