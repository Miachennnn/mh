export const validateEmail = (email) => {
	const Rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
	if (email === '') {
		return '不可以空白';
	} else if (email.search(Rule) === -1) {
		return '格式錯誤';
	} else return '';
};
