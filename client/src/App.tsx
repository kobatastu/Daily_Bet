import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MainRouter } from './router/MainRouter';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LoginScreen} />
        <Route path="/main" component={MainRouter} />
      </Router>
    </div>
  );
}

export default App;
