import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home/Home";
import CSignIn from "./containers/Auth/CSignIn";
import { useSelector } from 'react-redux';
import ListFamilies from './components/Families/ListFamilies/ListFamilies';
import CTabPanelMembers from './containers/Families/CTabPanelMembers';
import Board from './components/Board/Board';
 var auth;
 var families;
function App() {
   auth = useSelector( state => state.auth?.token);
   families = useSelector( state => state.auth?.families);
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
            <ListFamilies families={families}>
              <CTabPanelMembers />
            </ListFamilies>
          </PrivateRoute>
          <PrivateRoute path='/board'>
            <Board />
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
