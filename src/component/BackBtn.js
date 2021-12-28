import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../icons/back.svg';

const BackBtn = () => {
	const { clearAllState } = useContext(FormContext);
	let navigate = useNavigate();
	return (
		<div
			className="backBtn"
			onClick={() => {
				clearAllState();
				navigate(-1);
			}}
		>
			<BackIcon />
		</div>
	);
};

export default BackBtn;
