import { guardRunTimeError } from '../common/guardRunTimeError';

export type BetContentsData = {
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
};

const isBetContentsDataType = (data: unknown): data is BetContentsData =>
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
    } = data as BetContentsData;
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
      typeof status === 'string'
    ) {
      return true;
    } else {
      return false;
    }
  });

export const isBetContentsDatasType = (data: unknown): data is BetContentsData[] =>
  guardRunTimeError(() => {
    const betContentsDatas = data as BetContentsData[];
    if (betContentsDatas.every(isBetContentsDataType)) {
      return true;
    }
    return false;
  });
