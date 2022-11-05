/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react';
import 'react-native-gesture-handler'
import { AddRecipeStateProvider } from '@greeneggs/context/add-recipe-state-provider'
import { AuthProvider } from '@greeneggs/context/auth-provider'
import { CachedResourcesProvider } from '@greeneggs/context/cached-resources-provider'
import { EvaProvider } from '@greeneggs/context/eva-provider'
import { GraphQLProvider } from '@greeneggs/context/graphql-provider'
import { NotificationStateProvider } from '@greeneggs/context/notification-state-provider'
import { SearchStateProvider } from '@greeneggs/context/search-state-provider'
import { UserStateProvider } from '@greeneggs/context/user-state-provider'
import { Router } from '@greeneggs/navigation/routes/router'

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
