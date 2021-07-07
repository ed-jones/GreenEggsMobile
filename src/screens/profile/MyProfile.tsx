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
    alignItems: "center",
    height: "100%"
  },
  name: {
    alignSelf: "flex-start"
  },
  description: {
    justifyContent: "center"
  },
  button: {
    marginBottom: 8,
    alignSelf: "flex-end"
  },
  container: {
    flexDirection: "row"
  }
})


const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.view, paddingBottom: insets.bottom, paddingTop: insets.top}}>
      <Image source={Avatar} style={styles.Avatar}/>
      <View style={styles.container}>
        <Text category="h5" style={styles.name}>PROFILE NAME</Text>
        <Button style={styles.button} accessoryLeft={EditIcon}>EDIT</Button>
      </View>
      <Text style={styles.description} numberOfLines={2}>Profile Description</Text>
    </View>
  )
}


export default MyProfile;
