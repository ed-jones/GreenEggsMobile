import React from "react";
import { LabelledIcon } from "@greeneggs/core";
import { Divider, ListItem } from "@ui-kitten/components";
import { View, Text } from "react-native";
import ViewMore from "@greeneggs/core/view-more/ViewMore";

const RecipeTopComments = () => (
  <View style={{ marginHorizontal: -16 }}>
    <ListItem>
      <View style={{ flexDirection: "column", padding: 10 }}>
        <Text numberOfLines={2} style={{ marginBottom: 16 }}>
          Wow, I really enjoyed this recipe! If you liked this one you should
          check out my quiche recipe. I’ve done something similar but changed a
          couple of things.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>Bobby Rutherford</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <LabelledIcon label="10" iconName="heart-outline" />
            <LabelledIcon label="Reply" iconName="undo-outline" />
          </View>
        </View>
      </View>
    </ListItem>
    <Divider />
    <ViewMore onPress={() => null} />
  </View>
);

export default RecipeTopComments;
