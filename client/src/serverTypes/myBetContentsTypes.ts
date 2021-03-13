import { guardRunTimeError } from '../common/guardRunTimeError';

export type MyBetContentsData = {
  id: number;
  title: string;
  text: string;
  picture_name: string;
  bet_genre: string;
  bet_content_name_A: string;
  bet_content_name_B: string;
  total_bet_coin_A: number;
  total_bet_coin_B: number;
  expiration: Date;
  status: string;
  which: string;
  bet_coin_amount: number;
};

const isMyBetContentsDataType = (data: unknown): data is MyBetContentsData =>
  guardRunTimeError(() => {
    const {
      id,
      title,
      text,
      picture_name: pictureName,
      bet_genre: betGenre,
      bet_content_name_A: betContentNameA,
      bet_content_name_B: betContentNameB,
      total_bet_coin_A: totalBetCoinA,
      total_bet_coin_B: totalBetCoinB,
      expiration,
      status,
      which,
      bet_coin_amount: betCoinAmount,
    } = data as MyBetContentsData;
    if (
      typeof id === 'number' &&
      typeof title === 'string' &&
      typeof text === 'string' &&
      typeof pictureName === 'string' &&
      typeof betGenre === 'string' &&
      typeof betContentNameA === 'string' &&
      typeof betContentNameB === 'string' &&
      typeof totalBetCoinA === 'number' &&
      typeof totalBetCoinB === 'number' &&
      expiration instanceof Date &&
      typeof status === 'string' &&
      typeof which === 'string' &&
      typeof betCoinAmount === 'number'
    ) {
      return true;
    } else {
      return false;
    }
  });

export const isMyBetContentsDatasType = (data: unknown): data is MyBetContentsData[] =>
  guardRunTimeError(() => {
    const betContentsDatas = data as MyBetContentsData[];
    if (betContentsDatas.every(isMyBetContentsDataType)) {
      return true;
    }
    return false;
  });
