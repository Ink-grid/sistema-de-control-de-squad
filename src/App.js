/** @format */

import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import Register from './views/Register';
import Home from './views/Home';
import SquadDetalle from './views/squad_detalle/';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts/';
import Singin from './views/SingIn';

function App() {
  const { state } = useContext(StoreContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
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
          path="/register"
          render={() =>
            state.login ? (
              <MinimalLayout>
                <Home />
              </MinimalLayout>
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/squad/:id"
          render={() =>
            state.login ? (
              <MinimalLayout>
                {' '}
                <SquadDetalle />{' '}
              </MinimalLayout>
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
