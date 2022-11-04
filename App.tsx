/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import 'react-native-gesture-handler'
import { Router } from '@greeneggs/navigation'
import { AddRecipeStateProvider } from '@greeneggs/providers/add-recipe-state-provider'
import { AuthProvider } from '@greeneggs/providers/auth-provider'
import { CachedResourcesProvider } from '@greeneggs/providers/cached-resources-provider'
import { EvaProvider } from '@greeneggs/providers/eva-provider'
import { GraphQLProvider } from '@greeneggs/providers/graphql-provider'
import { NotificationStateProvider } from '@greeneggs/providers/notification-state-provider'
import { SearchStateProvider } from '@greeneggs/providers/search-state-provider'
import { UserStateProvider } from '@greeneggs/providers/user-state-provider'

export default function App(): ReactElement {
  return (
    <CachedResourcesProvider>
      <AuthProvider>
        <GraphQLProvider>
          <UserStateProvider>
            <EvaProvider>
              <SearchStateProvider>
                <NotificationStateProvider>
                  <AddRecipeStateProvider>
                    <Router />
                  </AddRecipeStateProvider>
                </NotificationStateProvider>
              </SearchStateProvider>
            </EvaProvider>
          </UserStateProvider>
        </GraphQLProvider>
      </AuthProvider>
    </CachedResourcesProvider>
  )
}
