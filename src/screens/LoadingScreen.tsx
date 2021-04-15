import React from 'react';
import { Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoadingScreen = () => (
  <View style={styles.container}>
    <Spinner/>
  </View>
);

export default LoadingScreen;
