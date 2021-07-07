import React from 'react';
import { Text, Image, View, StyleSheet, SafeAreaView} from 'react-native';
import ProfileImage from '../../assets/images/banner.jpg';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context"



const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
  },
  view: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
})


const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.view, paddingBottom: insets.bottom, paddingTop: insets.top}}>
      <Image source={ProfileImage} style={styles.profileImage}/> // try flexbox for centering image
      <Text>PROFILE NAME</Text>
      <Text>Profile Description</Text>
    </View>
  )
}

export default MyProfile;
