import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Loading } from '../components/Loading';
import { OddsCalcurator } from '../components/OddsCalcurator';
import { useQueryMyBetContents } from '../../hooks/fetcher/useQueryMyBetContents';
import { useAuth } from '../../hooks/useAuth';
import type { MyBetContentsData } from '../../serverTypes/myBetContentsTypes';

type Props = {
  id: number;
};

export const MyBetScreenContents: React.FC<Props> = ({ id }) => {
  const [myBetContents, setMyBetContens] = useState<MyBetContentsData[] | null>(null);
  const { querying, data } = useQueryMyBetContents(id);

  useEffect(() => {
    setMyBetContens(data);
  }, [data]);

  if (querying || !myBetContents) return <Loading />;
  if (myBetContents.length === 0) return <div>There is no bet data</div>;

  return (
    <div>
      {myBetContents.map((myBetContent) => (
        <div key={myBetContent.id}>
          <Card
            style={{
              maxWidth: 500,
              margin: '50px auto',
              backgroundColor: 'white',
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" style={{ margin: '10px 0 20px 0' }}>
                {myBetContent.title}
              </Typography>
              <div style={{ textAlign: 'center' }}>
                {myBetContent.which === 'A' && (
                  <p>
                    <b>{myBetContent.bet_content_name_A}</b>に
                    <b>{myBetContent.bet_coin_amount}コイン</b>
                    賭けました
                  </p>
                )}
                {myBetContent.which === 'B' && (
                  <p>
                    <b>{myBetContent.bet_content_name_A}</b>に
                    <b>{myBetContent.bet_coin_amount}コイン</b>
                    賭けました
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                {myBetContent.status === 'X' && <p>勝敗はまだ決していません</p>}
                {myBetContent.status === 'A' && (
                  <p>
                    <b>{myBetContent.bet_content_name_A}</b>の勝利です
                  </p>
                )}
                {myBetContent.status === 'B' && (
                  <p>
                    <b>{myBetContent.bet_content_name_B}</b>の勝利です
                  </p>
                )}
              </div>
              <h4>オッズ</h4>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper
                    style={{
                      textAlign: 'center',
                      paddingTop: '1px',
                      paddingBottom: '1px',
                      backgroundColor: '#FF6347',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                    color="red"
                  >
                    <p>{myBetContent.bet_content_name_A}</p>
                    <OddsCalcurator
                      myval={myBetContent.total_bet_coin_A}
                      coval={myBetContent.total_bet_coin_B}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    style={{
                      textAlign: 'center',
                      paddingTop: '1px',
                      paddingBottom: '1px',
                      backgroundColor: '#4169E1',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    <p>{myBetContent.bet_content_name_B}</p>
                    <OddsCalcurator
                      myval={myBetContent.total_bet_coin_B}
                      coval={myBetContent.total_bet_coin_A}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const MyBetScreen = () => {
  const { user } = useAuth();
  if (!user) return <div>Loading..</div>;
  return <MyBetScreenContents id={user.id} />;
};
