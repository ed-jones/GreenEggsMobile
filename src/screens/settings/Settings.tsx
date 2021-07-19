import React, { Component } from "react";
import {
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
  ListItem,
  Icon,
  Divider,
} from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { Icons } from "@greeneggs/core";
import Svg, { Circle } from "react-native-svg";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  header: { padding: 16 },
});

interface ListItemProps {
  title: string;
  icon: string;
  rightText?: string;
  color: string;
  onPress?: () => void;
}

const Colors = {
  blue: "#0284D4",
  yellow: "#DBB019",
  green: "#10C485",
  red: "#DB4A23",
};

interface ISettingListItem {
  item: ListItemProps;
}

const SettingsListItem = ({ item }: ISettingListItem) => (
  <>
    <ListItem
      onPress={item.onPress}
      title={item.title}
      accessoryRight={(props) => (
        <>
          <Text category="c2">{item.rightText}</Text>
          {item.onPress ? <Icons.Forward {...props} /> : null}
        </>
      )}
      accessoryLeft={(props) => (
        <>
          <Svg
            height="32"
            width="32"
            style={{ position: "absolute", marginLeft: 12 }}
          >
            <Circle cx="16" cy="16" r="16" fill={item.color} />
          </Svg>
          <Icon {...props} name={item.icon} fill="#FFFFFF" />
        </>
      )}
    />

    <Divider />
  </>
);

const Settings = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const AccountSettings: ListItemProps[] = [
    {
      title: "Edit Profile",
      icon: "edit-outline",
      color: Colors.blue,
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      title: "Change Password",
      icon: "lock-outline",
      color: Colors.yellow,
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      title: "Connect Accounts",
      icon: "link-2-outline",
      color: Colors.green,
      onPress: () => navigation.navigate("ConnectAccounts"),
    },
    {
      title: "Sign Out",
      icon: "log-out-outline",
      color: Colors.yellow,
      onPress: () => navigation.navigate("SignOut"),
    },
    {
      title: "Delete Account",
      icon: "trash-2-outline",
      color: Colors.red,
      onPress: () => navigation.navigate("DeleteAccount"),
    },
  ];

  const DietaryPreferences: ListItemProps[] = [
    {
      title: "Diets",
      icon: "heart-outline",
      color: Colors.green,
      onPress: () => navigation.navigate("Diets"),
    },
    {
      title: "Allergies",
      icon: "slash-outline",
      color: Colors.green,
      onPress: () => navigation.navigate("Allergies"),
    },
  ];

  const PrivacySettings: ListItemProps[] = [
    {
      title: "Profile Visibility",
      icon: "person-outline",
      color: Colors.green,
      onPress: () => navigation.navigate("ProfileVisibility"),
    },
  ];

  const About: ListItemProps[] = [
    {
      title: "Version",
      icon: "cube-outline",
      color: Colors.yellow,
      rightText: process.env.version || "alpha-0.01",
    },
    {
      title: "Developer",
      icon: "code-outline",
      color: Colors.green,
      rightText: "Green Eggs",
    },
  ];

  const navigateBack = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <TopNavigation
        title="Settings"
        alignment="center"
        style={{ backgroundColor: "transparent" }}
        accessoryLeft={() => (
          <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
        )}
      />
      <ScrollView>
        <Text category="h6" style={styles.header}>
          Account
        </Text>
        <List data={AccountSettings} renderItem={SettingsListItem} />
        <Text category="h6" style={styles.header}>
          Dietary Preferences
        </Text>
        <List data={DietaryPreferences} renderItem={SettingsListItem} />
        <Text category="h6" style={styles.header}>
          Privacy
        </Text>
        <List data={PrivacySettings} renderItem={SettingsListItem} />
        <Text category="h6" style={styles.header}>
          About
        </Text>
        <List data={About} renderItem={SettingsListItem} />
      </ScrollView>
    </>
  );
};

export default Settings;
