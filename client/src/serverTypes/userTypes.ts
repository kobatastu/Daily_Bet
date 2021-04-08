import { guardRunTimeError } from '../common/guardRunTimeError';

export type LawUserData = {
  id: number;
  email: string;
  password: string;
  name: string;
  coin: number;
  picture: string;
  life_flag: number;
};

export type UserData = {
  id: number;
  email: string;
  password: string;
  name: string;
  coin: number;
  picture: string;
  life_flag: boolean;
};

export type PostLoginData = {
  email: string;
  password: string;
};

const convertBooleanForMySQL = (flag: number): boolean => {
  if (flag === 1) {
    return true;
  }
  return false;
};

export const convertUserData = (data: unknown): UserData => {
  try {
    const userData = data as LawUserData;
    return {
      ...userData,
      life_flag: convertBooleanForMySQL(userData.life_flag),
    };
  } catch (e) {
    throw new Error('cannot convert user data');
  }
};

export const isLawUserDataType = (data: unknown): data is UserData =>
  guardRunTimeError(() => {
    const { id, email, password, name, coin, picture, life_flag: lifeFlag } = data as UserData;
    if (
      typeof id === 'number' &&
      typeof email == 'string' &&
      typeof password == 'string' &&
      typeof name == 'string' &&
      typeof coin == 'number' &&
      typeof picture == 'string' &&
      typeof lifeFlag == 'number'
    ) {
      return true;
    } else {
      return false;
    }
  });

export const isLawUserDatasType = (data: unknown): data is UserData[] =>
  guardRunTimeError(() => {
    const betContentsDatas = data as UserData[];
    if (betContentsDatas.every(isLawUserDataType)) {
      return true;
    }
    return false;
  });

export const isUserDataType = (data: unknown): data is UserData =>
  guardRunTimeError(() => {
    const { id, email, password, name, coin, picture, life_flag: lifeFlag } = data as UserData;
    if (
      typeof id === 'number' &&
      typeof email == 'string' &&
      typeof password == 'string' &&
      typeof name == 'string' &&
      typeof coin == 'number' &&
      typeof picture == 'string' &&
      typeof lifeFlag == 'boolean'
    ) {
      return true;
    } else {
      return false;
    }
  });

export const isUserDatasType = (data: unknown): data is UserData[] =>
  guardRunTimeError(() => {
    const betContentsDatas = data as UserData[];
    if (betContentsDatas.every(isUserDataType)) {
      return true;
    }
    return false;
  });
