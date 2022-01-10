import React, { useReducer } from 'react';

export const FormContext = React.createContext();

const FormContextProvier = (props) => {
	// >>>> Notes const [state,dispatch] = useReducer(reducer,initialState) <<<<
	// state: Store
	// dispatch:發actions給reducer
	// reducer:接受actions處理邏輯
	// initialState:初始化狀態
	// >>>> Notes const [state,dispatch] = useReducer(reducer,initialState) <<<<
	const initialState = {
		email: { val: '', isErr: false, err: '', touched: false },
		username: { val: '', isErr: false, err: '', touched: false },
		password: { val: '', isErr: false, err: '', touched: false },
		passwordAgain: { val: '', isErr: false, err: '', touched: false }
	};
	const formReducer = (state, action) => {
		const { type, name } = action;
		switch (type) {
			case 'UPDATE':
				return { ...state, [name]: action.data };
			case 'CLEAR':
				return initialState;
			default:
				return state;
		}
	};
	const [
		formState,
		dispatch
	] = useReducer(formReducer, initialState);

	return (
		<FormContext.Provider
			value={{
				formState,
				dispatch
			}}
		>
			{props.children}
		</FormContext.Provider>
	);
};

export default FormContextProvier;
