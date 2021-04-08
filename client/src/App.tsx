import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { MainRouter } from './router/MainRouter';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { userContext, useAuth } from './hooks/useAuth';

function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <userContext.Provider value={auth}>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginScreen />
            </Route>
            <Route
              path="/main"
              render={({ location }) =>
                auth.user ? (
                  <MainRouter />
                ) : (
                  <Redirect to={{ pathname: '/login', state: { from: location } }} />
                )
              }
            />
          </Switch>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
