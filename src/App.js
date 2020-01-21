/** @format */

import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import Register from './views/Register';
import Home from './views/Home';
import Singin from './views/SingIn';

function App() {
	const { state } = useContext(StoreContext);
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path='/'
					render={() => (state.login ? <Home /> : <Singin />)}
				/>
				<Route
					path='/register'
					render={() => (state.login ? <Home /> : <Register />)}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
