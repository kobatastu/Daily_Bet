import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useQueryLogin } from '../../hooks/fetcher/useQueryLogin';
import { userContext } from '../../hooks/useAuth';
import type { UserData } from '../../serverTypes/userTypes';

export const LoginScreen = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const { query } = useQueryLogin();
  const ctx = useContext(userContext);
  const history = useHistory();

  const signIn = (user: UserData) => ctx.signIn(user);

  const onSubmit = async () => {
    if (!email || !password) return;
    const user = await query(email, password);
    if (!user) {
      setIsLoginFailed(true);
      return;
    }
    signIn(user);
    history.push('/main/home');
  };

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
          {isLoginFailed && <p>メールアドレスまたはパスワードが間違っています</p>}
          <div style={{ marginTop: '30px' }}>
            <Grid item xs={6}>
              <p>メールアドレス</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="メールアドレスを入力してください"
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
          </div>
          <div style={{ marginTop: '30px' }}>
            <Grid item xs={6}>
              <p>パスワード</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="パスワードを入力してください"
                fullWidth
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </div>
          <div style={{ textAlign: 'center', margin: '30px auto' }}>
            <Button
              variant="contained"
              disabled={!email || !password}
              color="primary"
              onClick={onSubmit}
            >
              ログイン
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
