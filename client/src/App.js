import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store  from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/add-experience';
import AddEducation from './components/add-credentials/add-education';
import Profiles from './components/profiles/Profiles';

import './App.css';

//Check for token

if(localStorage.jwtToken) {
    // Set the auth token header auth
    setAuthToken(localStorage.jwtToken);

    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        // Logout the user
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile);
        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
              <div className="App">
                  <Navbar />
                  <Route exact path="/" component={Landing} />
                  <div className="container">
                      <Route exact path="/register" component={Register}></Route>
                      <Route exact path="/login" component={Login}></Route>
                      <Route exact path="/profiles" component={Profiles}></Route>
                      <Switch>
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                      </Switch>
                      <Switch>
                        <PrivateRoute
                            exact
                            path="/create-profile"
                            component={CreateProfile}
                        />
                      </Switch>
                      <Switch>
                        <PrivateRoute
                          exact
                          path="/edit-profile"
                          component={EditProfile}
                        />
                      </Switch>
                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-experience"
                              component={AddExperience}
                          />
                      </Switch>
                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-education"
                              component={AddEducation}
                          />
                      </Switch>
                  </div>
                  <Footer />
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
