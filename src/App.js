import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import app from './firebase-config';
import Home from './component/Home';
import Login from './component/Login';
import Forgot from './component/Forgot';
import Signup from './component/Signup';
import Verify from './component/Verify';
function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/forgot" element={<Forgot />} />
				<Route path="/verify" element={<Verify />} />
			</Routes>
		</div>
	);
}

export default App;
