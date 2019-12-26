import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './app.css';
import Body from '../../containers/Body';
import Figaro from '../../containers/Figaro';
import Menu from '../../components/Menu';

toast.configure();

const App = () => {
  return (
    <>
    <ToastContainer autoClose={5000} />
    <Menu />
    <Switch>
      <Route exact path='/'>
        <Body />
      </Route>
      <Route path='/figaro'>
        <Figaro />
      </Route>
    </Switch>
    </>
);
}

export default App;
