import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import TopNavigationGeneric from '@greeneggs/core/top-navigation-generic';

const styles = StyleSheet.create({
  cardElement: {
    paddingHorizontal: 28,
    paddingVertical: 16
  }
})

const RecipeDescription = (
  { route }: any
) => {
  const { description, createdAt, title, submittedBy } = route.params;

  return (
    <View>
      <TopNavigationGeneric title="Description" />
      <Card
        header={() => (
          <View style={styles.cardElement}>
            <Text category="h6">{title}</Text>
            <Text category="s1">{`Created by ${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
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
