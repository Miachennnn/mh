import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ReactComponent as Logout } from '../icons/logout.svg';
import { styled } from '@mui/material/styles';
import homeStyle from '../style/home.module.css';
const Home = () => {
	let navigate = useNavigate();
	const [
		user,
		setUser
	] = useState('');
	useEffect(() => {
		let authToken = sessionStorage.getItem('AuthToken');
		if (authToken) {
			setUser(sessionStorage.getItem('username'));
			navigate('/');
		}

		if (!authToken) {
			navigate('/login');
		}
	}, []);
	const LogoutBtn = styled(Button)({
		fontSize: 16,
		background: 'none',
		color: '#fff',
		padding: '9px 19px 7px 16px',
		borderRadius: '4px',
		border: 'solid 1px #fff',
		textTransform: 'none',
		fontWeight: 'normal',
		width: '108px'
	});

	return (
		<div className={homeStyle.box_wrapper}>
			<span className={homeStyle.user}>Hi {user}</span>
			<div className={homeStyle.box_content}>
				<div className="groupImg" />
				<div className={homeStyle.msg}>LOGIN SUCCESS!</div>
				<LogoutBtn
					style={{ textAlign: 'center' }}
					onClick={() => {
						sessionStorage.removeItem('AuthToken');
						navigate('/login');
					}}
					startIcon={<Logout />}
				>
					Logout
				</LogoutBtn>
			</div>
		</div>
	);
};

export default Home;
