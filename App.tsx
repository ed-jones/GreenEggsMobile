import React from "react";
import "react-native-gesture-handler";
import CachedResourcesProvider from "@greeneggs/providers/CachedResourcesProvider";
import GraphQLProvider from "@greeneggs/providers/GraphQLProvider";
import EvaProvider from "@greeneggs/providers/EvaProvider";
import Router from "@greeneggs/navigation/routes/Router";
import AuthProvider from "@greeneggs/providers/AuthProvider";
import SearchStateProvider from "@greeneggs/providers/SearchStateProvider";

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
