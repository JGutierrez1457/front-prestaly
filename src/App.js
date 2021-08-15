import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home/Home";
import CSignIn from "./containers/Auth/CSignIn";
import CSignUp from "./containers/Auth/CSignUp";
import { useSelector } from 'react-redux';
import ListFamilies from './components/Families/ListFamilies/ListFamilies';
import CTabPanelMembers from './containers/Families/CTabPanelMembers';
import CTabPanelBoard from './containers/Families/CTabPanelBoard';
import { Typography } from '@material-ui/core';
var auth;
var families;
function App() {
  auth = useSelector(state => state.auth?.token);
  families = useSelector(state => state.auth?.families);

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
          <Route path='/signup' render={props => {
            if (auth) { return <Redirect to={{ pathname: '/families', state: { from: '/' } }} /> }
            return <CSignUp {...props} />
          }} />
          <PrivateRoute path='/families'>
            <>
              <Typography variant='h5' align='center' style={{ marginTop: '8px' }}>Familias</Typography>
              <ListFamilies families={families} members={true}>
                <CTabPanelMembers />
              </ListFamilies>
            </>
          </PrivateRoute>
          <>
            <Typography variant='h5' align='center' style={{ marginTop: '8px' }}>Prestamos</Typography>
            <PrivateRoute path='/board'>
              <ListFamilies families={families}>
                <CTabPanelBoard />
              </ListFamilies>
            </PrivateRoute>
          </>
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
