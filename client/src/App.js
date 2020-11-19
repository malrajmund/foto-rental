import React, { Fragment, useEffect } from "react";
import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./stylesheets/App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import OfferForm from "./components/offers/OfferForm";
import myOffers from "./components/offers/myOffers";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <body>
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/OfferForm' component={OfferForm} />
              <PrivateRoute exact path='/myOffers/:id' component={myOffers} />
            </Switch>
          </body>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
