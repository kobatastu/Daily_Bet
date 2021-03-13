import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { OddsCalcurator } from '../components/OddsCalcurator';
import { useQueryMyBetContents } from '../../hooks/fetcher/useQueryMyBetContents';
import type { MyBetContentsData } from '../../serverTypes/myBetContentsTypes';

export const MyBetScreen = () => {
  const [myBetContents, setMyBetContens] = useState<MyBetContentsData[] | null>(null);
  const { querying, data } = useQueryMyBetContents('1');

  useEffect(() => {
    setMyBetContens(data);
  }, [data]);

  if (querying || !myBetContents) return <div>Loading..</div>;

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
