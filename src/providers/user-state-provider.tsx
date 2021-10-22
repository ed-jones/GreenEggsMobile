/**
 * Author: Edward Jones
 */
import React, { useState, FC, Dispatch, SetStateAction, createContext, useEffect } from 'react';
import { Me as MeQuery, Me_me_data } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';
import { Queries } from '@greeneggs/graphql';

type Me = Me_me_data | undefined;
type SetMe = ((me: Me) => void) | undefined;

export const UserContext = createContext({
  me: undefined as Me,
  setMe: undefined as SetMe,
});

/**
 * Provider that lets all child components access details about the current logged in user.
 */
export const UserStateProvider: FC = ({ children }) => {
  const [me, setMe] = useState<Me>();
  const { data } = useQuery<MeQuery>(Queries.ME)
  
  useEffect(() => {
    setMe(data?.me.data ?? undefined);
  }, [data]);

  return (
    <UserContext.Provider value={{ me, setMe }}>
      {children}
    </UserContext.Provider>
  );
};
