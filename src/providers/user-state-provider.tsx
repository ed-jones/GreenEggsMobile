/**
 * Author: Edward Jones
 */
import React, { useState, createContext, useEffect, PropsWithChildren } from 'react'
import { Me as MeQuery, Me_me_data } from '@greeneggs/types/graphql'
import { useQuery } from '@apollo/client'
import { Queries } from '@greeneggs/graphql'

type Me = Me_me_data | undefined
type SetMe = ((me: Me) => void) | undefined

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserContext = createContext({
  me: undefined as Me,
  setMe: undefined as SetMe,
})

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
