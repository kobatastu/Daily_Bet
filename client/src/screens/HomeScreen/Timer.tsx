import React, { useState } from 'react';
import { Bets } from './Bets';
import { Finish } from './Finish';

type Props = {
  Aname: string;
  Bname: string;
  status: string;
  Atotal: number;
  Btotal: number;
  time: string;
};

export const Timer: React.FC<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      {Date.parse(props.time) < date.getTime() ? (
        <Finish
          Aname={props.Aname}
          Bname={props.Bname}
          status={props.status}
          Atotal={props.Atotal}
          Btotal={props.Btotal}
        />
      ) : (
        <div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            ベット終了まで残り
            <div style={{ color: 'red' }}>
              {Math.floor((Date.parse(props.time) - date.getTime()) / (24 * 3600000))}日
              {Math.floor(((Date.parse(props.time) - date.getTime()) % (24 * 3600000)) / 3600000)}
              時間
              {Math.floor(((Date.parse(props.time) - date.getTime()) % 3600000) / 60000)}分
              {((Date.parse(props.time) - date.getTime()) % 60000) / 1000}秒
            </div>
          </div>

          <Bets
            Aname={props.Aname}
            Bname={props.Bname}
            Atotal={props.Atotal}
            Btotal={props.Btotal}
          />
        </div>
      )}
    </div>
  );
};
