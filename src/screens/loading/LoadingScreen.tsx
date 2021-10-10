import React from 'react';
import { Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Background } from '@greeneggs/ui';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoadingScreen = () => (
  <Background style={styles.container}>
    <Spinner />
  </Background>
);

export default LoadingScreen;
