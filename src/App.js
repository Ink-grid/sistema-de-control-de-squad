/** @format */

import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import Register from './views/Register';
import Home from './views/Home';
import SquadDetalle from './views/squad_detalle/';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts/';
import Singin from './views/SingIn';


import TableNewExample from '../src/components/table-new/index'
import SquadItem from "../src/components/squad-item";
import WhatsApp from '../src/components/whatsapp';


function App() {
	const { state } = useContext(StoreContext);
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path='/'
					render={() =>
						state.login ? (
							<MainLayout>
								<Home />
							</MainLayout>
						) : (
								<Singin />
							)
					}
				/>
				<Route
					path='/detalle'
					render={() =>
						state.login ? (
							<MainLayout>
								<SquadItem />
							</MainLayout>
						) : (
								<Register />
							)
					}
				/>

				<Route
					path='/squad/:id'
					render={() =>
						state.login ? (
							<MainLayout>
								{' '}
								<SquadDetalle />{' '}
							</MainLayout>
						) : (
								<Singin />
							)
					}
				/>
				<Route
					path='/nuevo'
					render={() =>
						state.login ? (
							<MainLayout>
								<TableNewExample style={{marginTop:'100px',marginRight:'30px'}} />
							</MainLayout>
						) : (
								<Singin />
							)
					}
				/>

				<Route
					path='/detalle'
					render={() =>
						state.login ? (
							<MainLayout>
								<div style={{marginTop:'100px'}}><h1>Detalle SQUAD</h1></div>
							</MainLayout>
						) : (
								<Singin />
							)
					}
				/>
				<Route
					path='/canvas'
					render={() =>
						state.login ? (
							<MainLayout>
								<div style={{marginTop:'100px'}}><h1>Canvas</h1></div>
							</MainLayout>
						) : (
								<Singin />
							)
					}
				/>
					<Route
					path='/whatsapp'
					render={() =>
						state.login ? (
							<MainLayout>
								<WhatsApp/>
							</MainLayout>
						) : (
								<Singin />
							)
					}
				/>
					

			</Switch>
		</BrowserRouter>
	);
}


export default App;
