import React, {useState} from 'react';
import axios from 'axios';

const Registration = (props) => {
	const [state, setState] = useState({
		email: '',
		username: '',
		password: '',
		password_confirmation: '',
		registrationErrors: ''
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(
				'http://localhost:3000/registrations',
				{
					user: {
						email: state.email,
						username: state.username,
						password: state.password,
						password_confirmation: state.password_confirmation
					}
				},
				{withCredentials: true}
			)
			.then((response) => {
				if (response.data.status === 'created') {
					console.log(response);
					props.handleSuccessfulAuth(response.data);
				}
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
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={state.username}
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={state.password}
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					name='password_confirmation'
					placeholder='Password Confirmation'
					value={state.password_confirmation}
					onChange={handleChange}
					required
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default Registration;
