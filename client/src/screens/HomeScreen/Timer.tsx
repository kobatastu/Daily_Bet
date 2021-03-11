import React, { useState } from 'react';
import { Bets } from './Bets';
import { Finish } from './Finish';

type Props = {
  Aname: string;
  Bname: string;
  status: string;
  Atotal: number;
  Btotal: number;
  time: Date;
};

export const Timer: React.FC<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  const { Aname, Bname, status, Atotal, Btotal, time } = props;
  return (
    <div>
      {time.getTime() < date.getTime() ? (
        <Finish Aname={Aname} Bname={Bname} status={status} Atotal={Atotal} Btotal={Btotal} />
      ) : (
        <div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            ベット終了まで残り
            <div style={{ color: 'red' }}>
              {Math.floor((time.getTime() - date.getTime()) / (24 * 3600000))}日
              {Math.floor(((time.getTime() - date.getTime()) % (24 * 3600000)) / 3600000)}
              時間
              {Math.floor(((time.getTime() - date.getTime()) % 3600000) / 60000)}分
              {((time.getTime() - date.getTime()) % 60000) / 1000}秒
            </div>
          </div>

          <Bets Aname={Aname} Bname={Bname} Atotal={Atotal} Btotal={Btotal} />
        </div>
      )}
    </div>
  );
};
