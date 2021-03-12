import React, { Fragment, useEffect } from "react";
import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import OfferForm from "./components/offers/OfferForm";
import OfferReservationForm from "./components/offers/OfferReservationForm";
import Footer from "./components/layout/Footer";
import "material-design-icons/iconfont/material-icons.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./stylesheets/App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import BasketPage from "./components/basket/BasketPage";
import DashboardMyOffers from "./components/dashboard/DashboardMyOffers";
import DashboardMyRes from "./components/dashboard/DashboardMyRes";
import SearchPage from "./components/search/SearchPage";
import DashboardChat from './components/dashboard/DashboardChat';
import TempAdminPanel from "./components/misc/TempAdminPanel";

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
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/adminpanel' component={TempAdminPanel} />
              <Route exact path='/search/results' component={SearchPage} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/OfferForm' component={OfferForm} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/chat' component={DashboardChat} />
              <PrivateRoute exact path='/myOffers/:id' component={DashboardMyOffers} />
              <Route exact path='/basket/:id' component={BasketPage} />
              <Route exact path='/offers/:id' component={OfferReservationForm} />
              <PrivateRoute exact path='/myReservations/:id' component={DashboardMyRes} />
            </Switch>
          </body>
        </Fragment>
      </Router>
      <Footer />
    </Provider>
  );
};

export default App;
