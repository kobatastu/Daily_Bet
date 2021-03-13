import { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { useMutationMyBoughtCoin } from '../../hooks/fetcher/useMutationMyBoughtCoin';

export const CoinMarketScreen = () => {
  const [coin, setCoin] = useState(0);
  const { mutate } = useMutationMyBoughtCoin();
  const submit = () => {
    mutate({ user_id: 1, my_bought_coin: coin });
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
          <div style={{ marginTop: '30px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p>購入コイン量</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="number"
                  label="数量を入力してください"
                  type="number"
                  fullWidth
                  onChange={(e) => {
                    setCoin(Number(e.target.value));
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ margin: '20px 0px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p>現在のレート</p>
              </Grid>
              <Grid item xs={6}>
                <p>0.2JPY/コイン</p>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p>購入金額</p>
              </Grid>
              <Grid item xs={6}>
                <p>¥{coin * 0.2}</p>
              </Grid>
            </Grid>
          </div>
          <div style={{ textAlign: 'center', margin: '30px auto' }}>
            <Button variant="contained" color="primary" onClick={submit}>
              購入
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
