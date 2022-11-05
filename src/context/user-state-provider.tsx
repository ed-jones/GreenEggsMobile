/**
 * Author: Edward Jones
 */
import { useState, useEffect, PropsWithChildren } from 'react';
import { Me as MeQuery } from '@greeneggs/types/graphql'
import { useQuery } from '@apollo/client'
import { Queries } from '@greeneggs/graphql'
import { Me, UserContext } from './index'

/**
 * Provider that lets all child components access details about the current logged in user.
 */
export function UserStateProvider({ children }: PropsWithChildren<object>) {
  const [me, setMe] = useState<Me>()
  const { data } = useQuery<MeQuery>(Queries.getMe)

  useEffect(() => {
    setMe(data?.me.data ?? undefined)
  }, [data])

  return <UserContext.Provider value={{ me, setMe }}>{children}</UserContext.Provider>
}
