import React from 'react';
import { Image, View, StyleSheet, SafeAreaView} from 'react-native';
import {
  Text,
  Button,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Avatar
} from '@ui-kitten/components';

import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context"

const EditIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const SettingIcon = (props) => (
  <Icon {...props} fill="#000000" name='settings-2-outline'/>
);

const AddPersonIcon = (props) => (
  <Icon {...props} fill="#000000" name='person-add-outline'/>
);

const MoreIcon = (props) => (
  <Icon {...props} fill="#000000" name='more-horizontal'/>
);

const navigateBack = () => {
  navigation.goBack();
};

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  avatar: {
    margin: 8,
    width: 120,
    height:120
  },
  view: {
    backgroundColor: "#F7F9FC",
    height: "100%"
  },
  description: {
    padding: 16
  },
  button: {
    width: 99,
    height: 32
  },
  topButton: {
    width: 24,
    height: 24,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  profileContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})


const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.view, paddingBottom: insets.bottom, paddingTop: insets.top}}>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction icon={SettingIcon} onPress={navigateBack} />
        )}
        accessoryRight={() => (
          <><TopNavigationAction icon={AddPersonIcon} onPress={navigateBack} />
          <TopNavigationAction icon={MoreIcon} onPress={navigateBack} /></>
        )}
      />
      <View style={styles.avatarContainer}>
        <Avatar style={styles.avatar} shape='round' size='giant' source={require('../../assets/images/banner.jpg')}/>
      </View>
      <View style={styles.profileContainer}>
        <Text category="h5">PROFILE NAME</Text>
        <Button style={styles.button} accessoryLeft={EditIcon}>EDIT</Button>
      </View>
      <Text style={styles.description} numberOfLines={2}>Profile Description</Text>
      <View style={styles.statContainer}>
        <Text>Following</Text>
        <Text>Followers</Text>
        <Text>Recipes</Text>
        <Text>Likes</Text>
      </View>

    </View>
  )
}


export default MyProfile;
