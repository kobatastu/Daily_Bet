import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useAuth, useProviderAuth } from '../../hooks/useAuth';

export const MyPageScreen = () => {
  const { user } = useAuth();
  const { signOut } = useProviderAuth();
  const history = useHistory();

  return (
    <div>
      <Card
        style={{
          maxWidth: 800,
          margin: '50px auto',
          backgroundColor: 'white',
        }}
      >
        <CardContent>
          <div style={{ marginTop: '30px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p>ユーザーネーム</p>
              </Grid>
              <Grid item xs={6}>
                <p>{user?.name}</p>
              </Grid>
            </Grid>
          </div>
          <div style={{ margin: '20px 0px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p>所有コイン</p>
              </Grid>
              <Grid item xs={6}>
                <p>{user?.coin}コイン</p>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div style={{ textAlign: 'center', margin: '30px auto' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                signOut();
                history.push('/login');
              }}
            >
              ログアウト
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
