/**
 * Author: Edward Jones
 */
import { Background, TopNavigation } from "@greeneggs/ui";
import React, { FC } from "react";
import { WebView } from "react-native-webview";

export const PrivacyPolicy: FC = () => {
  return (
    <Background>
      <TopNavigation title="Privacy Policy" />
      <WebView source={{ uri: "https://greeneggs.app/privacy" }} />
    </Background>
  );
};
