import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redir = () => {
	let navigate = useNavigate();
	useEffect(() => {
		const url = new URL(window.location);
		const currentMode = getParameterByName('mode')[0];
		if (currentMode === 'verifyEmail') {
			window.location.assign(`https://${process.env.REACT_APP_AUTHDOMAIN}/__/auth/action?${url.search}`);
		} else if (currentMode === 'resetPassword') {
			navigate(`/verify${url.search}`);
		}
	}, []);
	return <div className="redirect">畫面自動跳轉中...</div>;
};

function getParameterByName(name) {
	const url = new URL(window.location);
	const { searchParams } = url;
	return searchParams.getAll(name);
}

export default Redir;
