import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/SignIn/SignIn";
import ListFamilies from './components/Families/ListFamilies/ListFamilies';
import ListLoans from './components/Loans/ListLoans/ListLoans';
var auth = false;
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={props => {
            if (auth) { return <Redirect to={{ pathname: '/families', state: { from: '/' } }} /> }
            return <Home {...props} />
          }} />
          <Route path='/login' render={props => <SignIn {...props} />} />
          <PrivateRoute path='/families'>
            <ListFamilies />
          </PrivateRoute>
          <PrivateRoute path='/loans'>
            <ListLoans />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
function PrivateRoute({ children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (children) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )}
    />
  )
}

export default App;
