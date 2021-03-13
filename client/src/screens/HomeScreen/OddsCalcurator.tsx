import React from 'react';

type Props = {
  myval: number;
  coval: number;
};

export const OddsCalcurator: React.FC<Props> = (props) => {
  const a = ((props.myval + props.coval) * 11) / 10 + 100;
  const b = props.coval / 10 + props.myval + 50;
  const odds = Math.round((a / b) * 1000) / 1000;
  return <p style={{ fontSize: '30px', fontWeight: 'bold' }}>{odds}</p>;
};
