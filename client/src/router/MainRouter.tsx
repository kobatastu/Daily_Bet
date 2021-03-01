import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { MyBetScreen } from '../screens/MyBetScreen/MyBetScreen';
import { BoardScreen } from '../screens/BoardScreen/BoardScreen';
import { CoinMarketScreen } from '../screens/CoinMarketScreen/CoinMarketScreen';

export const MainRouter = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={false} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Home" to="/main/home" component={Link} />
          <Tab label="MyBet" to="/main/mybet" component={Link} />
          <Tab label="Board" to="/main/board" component={Link} />
          <Tab label="CoinMarket" to="/main/coinmarket" component={Link} />
        </Tabs>
      </AppBar>
      <Route exact path="/main/home" component={HomeScreen} />
      <Route exact path="/main/mybet" component={MyBetScreen} />
      <Route exact path="/main/board" component={BoardScreen} />
      <Route exact path="/main/coinmarket" component={CoinMarketScreen} />
    </div>
  );
};
