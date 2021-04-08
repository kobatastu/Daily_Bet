import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';

import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { MyBetScreen } from '../screens/MyBetScreen/MyBetScreen';
import { BoardScreen } from '../screens/BoardScreen/BoardScreen';
import { CoinMarketScreen } from '../screens/CoinMarketScreen/CoinMarketScreen';
import { MyPageScreen } from '../screens/MyPageScreen/MyPageScreen';

export const MainRouter = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={false} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab icon={<HomeIcon />} to="/main/home" component={Link} />
          <Tab icon={<MonetizationOnIcon />} to="/main/mybet" component={Link} />
          <Tab icon={<AssignmentIcon />} to="/main/board" component={Link} />
          <Tab icon={<StoreIcon />} to="/main/coinmarket" component={Link} />
          <Tab icon={<PersonIcon />} to="/main/mypage" component={Link} />
        </Tabs>
      </AppBar>
      <Route exact path="/main/home" component={HomeScreen} />
      <Route exact path="/main/mybet" component={MyBetScreen} />
      <Route exact path="/main/board" component={BoardScreen} />
      <Route exact path="/main/coinmarket" component={CoinMarketScreen} />
      <Route exact path="/main/mypage" component={MyPageScreen} />
    </div>
  );
};
