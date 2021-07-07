import React from 'react';
import { Image, View, StyleSheet, SafeAreaView} from 'react-native';
import {
  Text,
  Button,
  Icon
} from '@ui-kitten/components';
import Avatar from '../../assets/images/icon.png';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context"

const EditIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120/2
  },
  view: {
    backgroundColor: "#F7F9FC",
    height: "100%"
  },
  name: {
  },
  description: {
  },
  button: {
    marginBottom: 8,
    width: 99,
    height: 32
  },
  profileContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statContainer: {

  }
})


const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.view, paddingBottom: insets.bottom, paddingTop: insets.top}}>

      <Image source={Avatar} style={styles.Avatar}/>
      <View style={styles.profileContainer}>
        <Text category="h5" style={styles.name}>PROFILE NAME</Text>
        <Button style={styles.button} accessoryLeft={EditIcon}>EDIT</Button>
      </View>
      <Text style={styles.description} numberOfLines={2}>Profile Description</Text>
      <View style={styles.statContainer}>
        <Text> THIS IS WHERE THE STATS WILL GO</Text>
      </View>

    </View>
  )
}


export default MyProfile;
