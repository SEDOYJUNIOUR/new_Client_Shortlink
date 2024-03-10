import {Route, Routes} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Register from './pages/RegisterPage/Register';
import SignIn from './pages/SigninPage/SignIn';
import Profile from './pages/ProfilePage/Profile';
import ShortLink from './pages/ShortLinkPage/ShortLink';

function App() {
	return (
		<>
			<Routes>
				<Route path='*' element={<Home/>}/>
				<Route path='/register' element={<Register/>}/>
				<Route path='/sign-in' element={<SignIn/>}/>
				<Route path='/profile' element={<Profile/>}/>
				<Route path='/shortLink' element={<ShortLink/>}/>
			</Routes>
		</>
	);
}

export default App;
