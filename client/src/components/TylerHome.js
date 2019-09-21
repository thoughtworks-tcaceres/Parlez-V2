import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import axios from 'axios';

const TylerHome = (props) => {
	const handleSuccessfulAuth = (data) => {
		props.history.push('/dashboard');
		props.handleLogin(data);
	};
	const handleLogoutClick = () => {
		axios
			.delete('http://localhost:3000/logout', {withCredentials: true})
			.then(() => props.handleLogout)
			.catch(() => console.log('error found trying to log out'));
		props.handleLogout();
	};
	return (
		<div>
			<h1>Home line 1</h1>
			<h1>Status: {props.loggedInStatus}</h1>
			<button onClick={handleLogoutClick}>Logout</button>
			<Registration handleSuccessfulAuth={handleSuccessfulAuth}></Registration>
			<Login handleSuccessfulAuth={handleSuccessfulAuth} />
		</div>
	);
};

export default TylerHome;
