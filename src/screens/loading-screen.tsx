/**
 * Author: Edward Jones
 */
import React from 'react';
import { Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Background } from '@greeneggs/ui';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const LoadingScreen = () => (
  <Background style={styles.container}>
    <Spinner />
  </Background>
);
