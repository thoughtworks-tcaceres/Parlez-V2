// import React, {useState, useEffect} from 'react';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import TylerHome from './components/TylerHome';
// import TylerDashboard from './components/TylerDashboard';
// import axios from 'axios';

// const TylerApp = () => {
// 	const [state, setState] = useState({
// 		loggedInStatus: 'NOT_LOGGED_IN',
// 		user: {}
// 	});

// 	const handleLogin = (data) => {
// 		setState({...state, loggedInStatus: 'LOGGED_IN', user: data.user});
// 	};

// 	const handleLogout = () => {
// 		// setState({...state, loggedInStatus: 'NOT_LOGGED_IN'});
// 	};

// 	const checkLoginStatus = () => {
// 		axios
// 			.get('http://localhost:3000/logged_in', {withCredentials: true})
// 			.then((response) => {
// 				if (
// 					response.data.logged_in &&
// 					state.loggedInStatus === 'NOT_LOGGED_IN'
// 				) {
// 					setState({
// 						...state,
// 						loggedInStatus: 'LOGGED_IN',
// 						user: response.data.user
// 					});
// 				} else if (
// 					!response.data.logged_in &&
// 					state.loggedInStatus === 'LOGGED_IN'
// 				) {
// 					setState({
// 						...state,
// 						loggedInStatus: 'NOT_LOGGED_IN',
// 						user: {}
// 					});
// 				}
// 			})
// 			.catch((error) => console.log(error));
// 	};

// 	useEffect(() => {
// 		checkLoginStatus();
// 	}, []);

// 	return (
// 		<div>
// 			<BrowserRouter>
// 				<Switch>
// 					<Route
// 						exact
// 						path={'/'}
// 						render={(props) => (
// 							<TylerHome
// 								{...props}
// 								handleLogout={handleLogout}
// 								handleLogin={handleLogin}
// 								loggedInStatus={state.loggedInStatus}></TylerHome>
// 						)}></Route>
// 					<Route
// 						exact
// 						path={'/dashboard'}
// 						render={(props) => (
// 							<TylerDashboard
// 								{...props}
// 								loggedInStatus={state.loggedInStatus}></TylerDashboard>
// 						)}></Route>
// 				</Switch>
// 			</BrowserRouter>
// 		</div>
// 	);
// };

// export default TylerApp;
