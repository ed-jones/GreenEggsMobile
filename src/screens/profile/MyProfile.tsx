import React from 'react';
import { Text, Image, View, StyleSheet, SafeAreaView} from 'react-native';
import ProfileImage from '../../assets/images/icon.png';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context"



const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150/2
  },
  view: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    height: "100%"

  }
})


const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.view, paddingBottom: insets.bottom, paddingTop: insets.top}}>
      <Text category="h1">PROFILE NAME</Text>
      <Image source={ProfileImage} style={styles.profileImage}/>

    </View>
  )
}

export default MyProfile;
