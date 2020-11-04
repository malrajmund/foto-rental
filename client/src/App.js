import React, { Fragment } from 'react';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './stylesheets/App.css';


const App = () => (
    <Provider store = {store}>
      <Router>
      <div className="App">
        <Fragment>
          <NavBar />
          <body>
          <Route exact path ='/' component = {Landing} />
          
         
            <Switch>
              <Route exact path ='/register' component = {Register} />
              <Route exact path ='/login' component = {Login} />
            </Switch>
            
            
          
          </body>
          </Fragment>
          </div>
        
      </Router>
    </Provider>
);

export default App;
