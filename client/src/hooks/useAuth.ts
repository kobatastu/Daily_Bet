/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useCallback, createContext } from 'react';

import type { UserData } from '../serverTypes/userTypes';

type UserContext = {
  user: UserData | null;
  signIn: (user: UserData) => void;
  signOut: () => void;
};

const defaultContext: UserContext = {
  user: null,
  signIn: (user) => {},
  signOut: () => {},
};

export const userContext = createContext<UserContext>(defaultContext);

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const signIn = useCallback(
    (user: UserData) => {
      setUser(user);
    },
    [user]
  );
  const signOut = useCallback(() => setUser(null), []);
  return { user, signIn, signOut };
};
