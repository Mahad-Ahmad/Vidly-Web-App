import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./component/movies";
import Customers from "./component/customers";
import NotFound from "./component/notFound";
import Rentals from "./component/rentals";
import MovieForm from "./component/movieForm";
import NavBar from "./component/navBar";
import RegisterForm from "./component/registerForm";
import LoginForm from "./component/loginForm";
import Logout from "./component/logout";
import ProtectedRoute from "./component/common/protectedRoute";
import { getCurretUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurretUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <Router>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/notfound" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect from="*" to="/notfound" />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
