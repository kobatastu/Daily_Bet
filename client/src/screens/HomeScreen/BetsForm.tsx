import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { OddsCalcurator } from '../components/OddsCalcurator';

type Props = {
  Atotal: number;
  Btotal: number;
  Aname: string;
  Bname: string;
};

const mycoin = 500;

export const BetsForm: React.FC<Props> = (props) => {
  const [totalA, setTotalA] = useState(0);
  const [totalB, setTotalB] = useState(0);
  const [name, setName] = useState('');
  const [bet, setBet] = useState(0);

  const { Atotal, Btotal } = props;

  useEffect(() => {
    setTotalA(Atotal);
    setTotalB(Btotal);
  }, []);

  const submit = () => {
    if (mycoin < bet) {
      alert('コインが足りません');
    } else {
      if (name === 'A') {
        setTotalA(totalA + bet);
      } else {
        setTotalB(totalB + bet);
      }
    }
  };

  return (
    <div>
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
            <p>{props.Aname}</p>
            <OddsCalcurator myval={totalA} coval={totalB} />
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
            <p>{props.Bname}</p>
            <OddsCalcurator myval={totalB} coval={totalA} />
          </Paper>
        </Grid>
      </Grid>

      <div style={{ textAlign: 'center' }}>
        <FormControl style={{ marginTop: '10px', marginBottom: '20px' }}>
          <InputLabel>選択してください</InputLabel>
          <Select
            native
            onChange={(e) => {
              if (!(typeof e.target.value === 'string')) return;
              setName(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="A">{props.Aname}</option>
            <option value="B">{props.Bname}</option>
          </Select>
        </FormControl>
        <form noValidate autoComplete="off" style={{ marginBottom: '20px' }}>
          <TextField
            type="number"
            placeholder="賭ける額を入力してください"
            onChange={(e) => {
              if (!(typeof e.target.value === 'number')) return;
              setBet(e.target.value);
            }}
          />
        </form>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => submit()}
          style={{ marginBottom: '20px' }}
        >
          Bet
        </Button>
      </div>
    </div>
  );
};
