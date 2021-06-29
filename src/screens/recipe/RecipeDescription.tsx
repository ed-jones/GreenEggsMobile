import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '@greeneggs/core';

const styles = StyleSheet.create({
  cardElement: {
    paddingHorizontal: 28,
    paddingVertical: 16
  }
})

const RecipeDescription = (
  { navigation, route }: any
) => {
  const insets = useSafeAreaInsets();
  const { description, createdAt, title, submittedBy } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{paddingTop: insets.top}}>
      <TopNavigation
        alignment="center"
        accessoryLeft={() => (
          <TopNavigationAction icon={Icons.Back}
            onPress={navigateBack}
          />
        )}
        title="Description"
        style={{backgroundColor: 'transparent',}}
      />
      <Card
        header={() => (
          <View style={styles.cardElement}>
            <Text category="h6">{title}</Text>
            <Text category="s1">{`${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
          </View>
        )}
        footer={() => (
          <Text style={styles.cardElement}>
            {(new Date(Number(createdAt))).toDateString()}
          </Text>
        )}
      >
        <Text>{description}</Text>
      </Card>
    </View>
  )
};

export default RecipeDescription;
