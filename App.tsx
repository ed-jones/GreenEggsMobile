import React from "react";
import "react-native-gesture-handler";
import CachedResourcesProvider from "@greeneggs/providers/cached-resources-provider";
import GraphQLProvider from "@greeneggs/providers/GraphQLProvider";
import EvaProvider from "@greeneggs/providers/eva-provider";
import Router from "@greeneggs/navigation/routes/Router";
import AuthProvider from "@greeneggs/providers/auth-provider";
import SearchStateProvider from "@greeneggs/providers/search-state-provider";

export default function App() {
  return (
    <CachedResourcesProvider>
      <AuthProvider>
        <GraphQLProvider>
          <EvaProvider>
            <SearchStateProvider>
              <Router />
            </SearchStateProvider>
          </EvaProvider>
        </GraphQLProvider>
      </AuthProvider>
    </CachedResourcesProvider>
  );
}
