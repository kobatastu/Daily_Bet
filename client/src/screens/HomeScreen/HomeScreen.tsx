import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Loading } from '../components/Loading';
import { Timer } from './Timer';
import { useQueryBetContents } from '../../hooks/fetcher/useQueryBetContents';
import type { BetContentsData } from '../../serverTypes/betContentsTypes';

export const HomeScreen: React.FC = () => {
  const [betContents, setBetContens] = useState<BetContentsData[] | null>(null);
  const { querying, data } = useQueryBetContents();

  useEffect(() => {
    setBetContens(data);
  }, [data]);

  if (querying || !betContents) return <Loading />;

  return (
    <div>
      {betContents.map((betContent, index) => (
        <div key={index}>
          <Card
            style={{
              maxWidth: 400,
              margin: '50px auto',
              backgroundColor: 'white',
            }}
          >
            <CardMedia
              component="img"
              src={`${process.env.PUBLIC_URL}/` + betContent.picture_name}
              style={{ height: '140' }}
            />

            <CardContent>
              <Typography>ジャンル : {betContent.bet_genre}</Typography>
              <Typography variant="h5" component="h2" style={{ margin: '10px 0 20px 0' }}>
                {betContent.title}
              </Typography>
              <Typography variant="body2" component="p">
                {betContent.text}
              </Typography>
              <div>
                <Timer
                  Aname={betContent.bet_content_name_A}
                  Bname={betContent.bet_content_name_B}
                  Atotal={betContent.total_bet_coin_A}
                  Btotal={betContent.total_bet_coin_B}
                  time={betContent.expiration}
                  status={betContent.status}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
