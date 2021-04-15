import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Text } from '@ui-kitten/components';
import { Recipes_recipes_submittedBy } from '../../types/graphql';
import NoAvatar from '../../assets/images/noavatar.jpg';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftElements: {
    flexDirection: 'row',
  },
  rightElements: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  ellipsisIcon: {
    width: 16,
    height: 16,
  }
});

export interface IRecipeCardHeaderProps extends Partial<Recipes_recipes_submittedBy> {
  avatarURI?: string | null;
  firstName: string;
  lastName: string;
}

const RecipeCardHeader = ({ avatarURI, firstName, lastName }: IRecipeCardHeaderProps) => (
  <View style={styles.view}>
    <View style={styles.leftElements}>
      <Avatar
        size='tiny'
        source={avatarURI ? {uri: avatarURI} : NoAvatar}
        style={styles.avatar}
      />
      <Text style={styles.username}>{`${firstName} ${lastName}`}</Text>
    </View>
    <View style={styles.rightElements}>
      <Icon style={styles.ellipsisIcon} name='more-horizontal' />
    </View>
  </View>
);

export default RecipeCardHeader;
