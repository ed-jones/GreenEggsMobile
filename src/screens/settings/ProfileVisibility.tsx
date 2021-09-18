import React from "react";
import {
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { Alert, Icons } from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  heading: {
    paddingVertical: 16,
  },
  input: {
    marginBottom: 10,
  },
});

const ProfileVisibility = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        alignment="center"
        title="Profile Visibility"
      />
      <ScrollView style={styles.view}>
        <Alert
          message={
            <Text>
              Here you can control which users are able to follow you.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Public</Text> means anyone
              can follow you.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Friends only</Text> means you
              have to approve follow requests.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Private</Text> means nobody
              can follow you. Your profile is hidden and you won't appear in any
              searches.{"\n\n"}
            </Text>
          }
          type="info"
        />
      </ScrollView>
    </>
  );
};

export default ProfileVisibility;
