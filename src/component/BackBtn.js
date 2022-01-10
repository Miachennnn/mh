import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import { clearFormState } from '../utils';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../icons/back.svg';

const BackBtn = () => {
	let navigate = useNavigate();
	const { dispatch } = useContext(FormContext);
	return (
		<div
			className="backBtn"
			onClick={() => {
				navigate(-1);
				clearFormState(dispatch);
			}}
		>
			<BackIcon />
		</div>
	);
};

export default BackBtn;
