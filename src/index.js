import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import FormContextProvier from './context/FormContext';
ReactDOM.render(
	<React.StrictMode>
		<FormContextProvier>
			<Router>
				<App />
			</Router>
		</FormContextProvier>
	</React.StrictMode>,
	document.getElementById('root')
);
