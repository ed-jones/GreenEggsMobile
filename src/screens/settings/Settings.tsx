import React from "react";
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

const styles = StyleSheet.create({
  header: { padding: 16 },
});

interface IAccountSettingListItem {
  title: string;
  icon: string;
  color: string;
}

const Colors = {
  blue: "#0284D4",
  yellow: "#DBB019",
  green: "#10C485",
  red: "#DB4A23",
};

const AccountSettings: IAccountSettingListItem[] = [
  { title: "Edit Profile", icon: "edit-outline", color: Colors.blue },
  { title: "Change Password", icon: "lock-outline", color: Colors.yellow },
  { title: "Connect Accounts", icon: "link-2-outline", color: Colors.green },
  { title: "Sign Out", icon: "log-out-outline", color: Colors.yellow },
  { title: "Delete Account", icon: "trash-2-outline", color: Colors.red },
];

const DietaryPreferences: IAccountSettingListItem[] = [
  { title: "Diets", icon: "heart-outline", color: Colors.green },
  { title: "Allergies", icon: "slash-outline", color: Colors.green },
];

const PrivacySettings: IAccountSettingListItem[] = [
  { title: "Profile Visibility", icon: "person-outline", color: Colors.green },
];

const About: IAccountSettingListItem[] = [
  { title: "Version", icon: "cube-outline", color: Colors.yellow },
  { title: "Developer", icon: "code-outline", color: Colors.green },
];

interface ISettingListItem {
  item: IAccountSettingListItem;
}

const SettingsListItem = ({ item }: ISettingListItem) => (
  <>
    <ListItem
      title={item.title}
      accessoryRight={Icons.Forward}
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

const Settings = ({ navigation }: any) => {
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
