import React from "react";
import "react-native-gesture-handler";
import CachedResourcesProvider from "@greeneggs/providers/CachedResourcesProvider";
import GraphQLProvider from "@greeneggs/providers/GraphQLProvider";
import EvaProvider from "@greeneggs/providers/EvaProvider";
import Router from "@greeneggs/navigation/routes/Router";
import AuthProvider from "@greeneggs/providers/AuthProvider";

export default function App() {
  return (
    <CachedResourcesProvider>
      <AuthProvider>
        <GraphQLProvider>
          <EvaProvider>
            <Router />
          </EvaProvider>
        </GraphQLProvider>
      </AuthProvider>
    </CachedResourcesProvider>
  );
}
