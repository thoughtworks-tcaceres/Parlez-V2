import React, {useState} from 'react';
import axios from 'axios';

const Login = (props) => {
	const [state, setState] = useState({
		email: '',
		// username: '',
		password: ''
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(
				'http://localhost:3000/sessions',
				{
					user: {
						email: state.email,
						// username: state.username,
						password: state.password
					}
				},
				{withCredentials: true}
			)
			.then((response) => {
				if (response.data.logged_in) {
					props.handleSuccessfulAuth(response.data);
				}
				console.log('res from login', response);
			})
			.catch((error) => console.log('registration error :', error));
	};

	const handleChange = (event) => {
		setState({...state, [event.target.name]: event.target.value});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={state.email}
					onChange={handleChange}
					required
				/>
				{/* <input
					type='text'
					name='username'
					placeholder='Username'
					value={state.username}
					onChange={handleChange}
					required
				/> */}
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={state.password}
					onChange={handleChange}
					required
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
