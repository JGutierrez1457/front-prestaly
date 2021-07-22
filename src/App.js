import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home/Home";
import CSignIn from "./containers/Auth/CSignIn";
import ListLoans from './components/Loans/ListLoans/ListLoans';
import { useSelector } from 'react-redux';
import CListFamilies from './containers/Families/CListFamilies';
 var auth;
function App() {
   auth = useSelector( state => state.auth?.auth?.token);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={props => {
            if (auth) { return <Redirect to={{ pathname: '/families', state: { from: '/' } }} /> }
            return <Home {...props} />
          }} />
          <Route path='/login' render={props => {
           if (auth) { return <Redirect to={{ pathname: '/families', state: { from: '/' } }} /> }
            return <CSignIn {...props} />
            }} />
          <PrivateRoute path='/families'>
            <CListFamilies />
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
