import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { MainRouter } from './router/MainRouter';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen';
import { userContext, useAuth, useProviderAuth } from './hooks/useAuth';
import { ErrorBoundary } from './error/ErrorBoundary';

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const auth = useAuth();
  return (
    <Route
      path="/main"
      render={({ location }) =>
        auth.user ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

const Provider = ({ children }: Props) => {
  const auth = useProviderAuth();
  return <userContext.Provider value={auth}>{children}</userContext.Provider>;
};

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Provider>
          <Router>
            <Switch>
              <Route exact path="/login">
                <LoginScreen />
              </Route>
              <Route exact path="/register">
                <RegisterScreen />
              </Route>
              <PrivateRoute>
                <MainRouter />
              </PrivateRoute>
            </Switch>
          </Router>
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
