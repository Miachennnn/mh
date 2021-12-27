import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../icons/back.svg';

const BackBtn = () => {
	let navigate = useNavigate();
	return (
		<div
			className="backBtn"
			onClick={() => {
				navigate(-1);
			}}
		>
			<BackIcon />
		</div>
	);
};

export default BackBtn;
