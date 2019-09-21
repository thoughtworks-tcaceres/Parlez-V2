import React, {useContext, useState} from 'react';
import './LoginPage.scss';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {ChatViewContext} from '../../Context';
import history from '../../history';

const ValidatedLoginForm = props => {
	const {masterState, dispatch} = useContext(ChatViewContext);
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const onChangeLoginEmail = e => {
		setLoginEmail(e.target.value);
	};

	const onChangeLoginPassword = e => {
		setLoginPassword(e.target.value);
	};

	const handleLoginSubmit = e => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:3003/auth/login',
				{
					email: loginEmail,
					password: loginPassword
				},
				{withCredentials: true}
			)
			.then(response => {
				console.log('POST HERE TO CHECK ON LOGIN PAGE TO SEE RESPONSE', response.data);
				if (response.data.logged_in) {
					history.push('/chat');
				}
				// if (response.data["user_id"] === loginEmail) {
				//   history.push("/chat");
				// }
				else {
					alert('Email does not exist');
				}

				/**************************** TYLERS CODE ****************************/
				// if (!response.data === "Error. Credentials are incorrect.") {
				//   console.log("checking the response data here", response.data);
				//   setAuth(true);
				// } else if (
				//   response.data.logged_in &&
				//   masterState.loggedInStatus === "NOT_LOGGED_IN"
				// ) {
				//   //set state with user:res.data.user_id and loggedInStatus: true
				// } else if (
				//   !response.data.logged_in &&
				//   masterState.loggedInStatus === "LOGGED_IN"
				// ) {
				// }
				//set state with loggedInStatus: false, user: null
				/**************************** TYLERS CODE ****************************/
			})
			.catch(err => console.log('error:', err));
	};

	return (
		<div className='container'>
			<form onSubmit={handleLoginSubmit} className='form-container'>
				<div className='title'>Parlez</div>
				<div className='inputWithIcon'>
					<input name='email' type='text' placeholder='Email...' value={loginEmail} onChange={onChangeLoginEmail} />
					<i className='iconWithEmail' />
				</div>

				<div className='inputWithIcon'>
					<input
						name='password'
						type='password'
						placeholder='Password...'
						value={loginPassword}
						onChange={onChangeLoginPassword}
					/>
					<i className='iconWithPassword' />
				</div>

				<div className='btn-container'>
					<Button type='submit'>Login</Button>

					<NavLink to='/signup' className='link'>
						<Button>Sign up</Button>
					</NavLink>
				</div>
			</form>
		</div>
	);
};

export default ValidatedLoginForm;
