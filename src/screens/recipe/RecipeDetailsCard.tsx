import React from "react";
import { LabelledIcon, noavatar } from "@greeneggs/core";
import { convertTimeEstimate } from "@greeneggs/core/convertTimeEstimate/convertTimeEstimate";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import { View, StyleSheet } from "react-native";
import { recipe_recipe } from "@greeneggs/types/graphql";
import { Text, Card, Avatar } from "@ui-kitten/components";

const styles = StyleSheet.create({
  coverPhoto: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  cardSection: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  tag: {
    borderRadius: 16,
    marginRight: 6,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#8F9BB3",
  },
  tags: {
    flexDirection: "row",
  },
  heading: {
    marginVertical: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

interface IRecipeDetailsCard extends recipe_recipe {
  navigation: any;
}

const RecipeDetailsCard = ({
  navigation,
  title,
  subtitle,
  timeEstimate,
  description,
  createdAt,
  submittedBy,
  likeCount,
  commentCount,
}: IRecipeDetailsCard) => {
  const navigateToDescription = () => {
    navigation.navigate("RecipeDescription", {
      description: description,
      createdAt: createdAt,
      title: title,
      submittedBy: submittedBy,
    });
  };

  return (
    <Card
      header={() => (
        <View style={{ ...styles.cardSection, ...styles.row }}>
          <View>
            <Text category="h5">{title}</Text>
            <Text category="s1">{subtitle}</Text>
          </View>
          <LabelledIcon
            label={convertTimeEstimate(timeEstimate)}
            iconName="clock-outline"
          />
        </View>
      )}
      footer={() => (
        <View style={styles.cardSection}>
          <Text numberOfLines={2}>{description}</Text>
          <ViewMore
            style={{ paddingHorizontal: 0, marginTop: 8 }}
            onPress={navigateToDescription}
          />
        </View>
      )}
    >
      <View style={styles.row}>
        <View style={styles.row}>
          <Avatar
            size="small"
            source={
              submittedBy.avatarURI ? { uri: submittedBy.avatarURI } : noavatar
            }
            style={styles.avatar}
          />
          <Text>{`${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
        </View>
        <View style={styles.row}>
          <LabelledIcon label={String(likeCount)} iconName="heart-outline" />
          <LabelledIcon
            label={String(commentCount)}
            iconName="message-square-outline"
          />
        </View>
      </View>
    </Card>
  );
};

export default RecipeDetailsCard;
