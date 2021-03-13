import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { OddsCalcurator } from './OddsCalcurator';

type Props = {
  status: string;
  Aname: string;
  Bname: string;
  Atotal: number;
  Btotal: number;
};

export const BetsResult: React.FC<Props> = (props) => {
  return (
    <div>
      <div style={{ textAlign: 'center', color: 'red' }}>
        {props.status === 'X' && <p>Bet期間は終了いたしました</p>}
        {props.status === 'A' && <p>{props.Aname}の勝利です</p>}
        {props.status === 'B' && <p>{props.Bname}の勝利です</p>}
      </div>
      <h4>最終オッズ</h4>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            style={{
              textAlign: 'center',
              paddingTop: '10px',
              paddingBottom: '10px',
              backgroundColor: '#FF6347',
              color: 'white',
              fontWeight: 'bold',
            }}
            color="red"
          >
            <p>{props.Aname}</p>
            <OddsCalcurator myval={props.Atotal} coval={props.Btotal} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              textAlign: 'center',
              paddingTop: '10px',
              paddingBottom: '10px',
              backgroundColor: '#4169E1',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            <p>{props.Bname}</p>
            <OddsCalcurator myval={props.Btotal} coval={props.Atotal} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
