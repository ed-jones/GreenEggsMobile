import React, { useState } from "react";
import {
  Button,
  Icon,
  IndexPath,
  List,
  ListItem,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { Alert, Icons, Mutations, Queries } from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Select, SelectItem } from "@ui-kitten/components";
import { useMutation, useQuery } from "@apollo/client";
import {
  Diets,
  Diets_diets_data,
  Me,
  RemoveDietaryPreferences,
  RemoveDietaryPreferencesVariables,
  UpdateDietaryPreferences,
  UpdateDietaryPreferencesVariables,
} from "@greeneggs/types/graphql";
import LoadingScreen from "../loading/LoadingScreen";
import { DietFragment, FullUserFragment } from "@greeneggs/graphql/fragments";

export const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  heading: {
    paddingVertical: 16,
  },
  input: {
    marginBottom: 10,
  },
});

const DietaryPreferences = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const getDiet = useQuery<Diets>(Queries.GET_DIETS);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  const getMe = useQuery<Me>(Queries.ME);

  const [removeDietaryPreferences, removeDietaryPreferencesResult] =
    useMutation<RemoveDietaryPreferences, RemoveDietaryPreferencesVariables>(
      Mutations.REMOVE_DIETARY_PREFERENCES
    );
  const [updateDietaryPreferences, updateDietaryPreferencesResult] =
    useMutation<UpdateDietaryPreferences, UpdateDietaryPreferencesVariables>(
      Mutations.UPDATE_DIETARY_PREFERENCES
    );

  if (getDiet.loading || getMe.loading) return <LoadingScreen />;
  if (getDiet.error) {
    return <Text>Error! {getDiet.error.message}</Text>;
  }
  if (getMe.error) {
    return <Text>Error! {getMe.error.message}</Text>;
  }
  const me = getMe.data?.me.data;
  const diets = getDiet.data?.diets.data || [];

  function handleSubmit() {
    if (me?.dietaryPreferences) {
      updateDietaryPreferences({
        variables: {
          dietaryPreferences: {
            diets: [
              ...me.dietaryPreferences.map((selectedDiet) => selectedDiet.id),
              diets[Number(selectedIndex.toString()) - 1].id,
            ],
          },
        },
        update(cache) {
          cache.writeFragment({
            id: `FullUser:${me.id}`,
            data: {
              ...me,
              dietaryPreferences: [
                ...new Set([
                  ...me.dietaryPreferences,
                  diets[Number(selectedIndex.toString()) - 1],
                ]),
              ],
            },
            fragment: FullUserFragment,
            fragmentName: "FullUserFragment",
          });
        },
      });
    }
  }

  function removeDiet(diet: Diets_diets_data) {
    if (me?.dietaryPreferences) {
      removeDietaryPreferences({
        variables: {
          dietaryPreferences: {
            diets: [diet.id],
          },
        },
        update(cache) {
          cache.writeFragment({
            id: `FullUser:${me.id}`,
            data: {
              ...me,
              dietaryPreferences: me.dietaryPreferences.filter(
                (allDiets) => allDiets.id !== diet.id
              ),
            },
            fragment: FullUserFragment,
            fragmentName: "FullUserFragment",
          });
        },
      });
    }
  }

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        alignment="center"
        title="Dietary Preferences"
      />
      <ScrollView>
        <View style={styles.view}>
          <Alert
            message="Here you can tell us your dietary preferences so that we can better show you recipes relevant to you."
            type="info"
          />
          <View style={{ flexDirection: "row" }}>
            <Select
              style={{ flex: 1, marginHorizontal: 8 }}
              onSelect={(index) => setSelectedIndex(index)}
              selectedIndex={selectedIndex}
              value={diets[Number(selectedIndex.toString()) - 1].name}
            >
              {diets.map((diet) => (
                <SelectItem key={diet.id} title={diet.name} />
              ))}
            </Select>
            <Button
              size="small"
              onPress={handleSubmit}
              accessoryLeft={
                updateDietaryPreferencesResult.loading
                  ? () => <Spinner size="small" status="control" />
                  : Icons.Add
              }
            >
              Add
            </Button>
          </View>
        </View>
        <List
          data={me?.dietaryPreferences}
          renderItem={({ item }: { item: Diets_diets_data }) => (
            <ListItem
              title={item.name}
              accessoryRight={(props) => (
                <Icons.Cross {...props} onPress={() => removeDiet(item)} />
              )}
            />
          )}
        />
      </ScrollView>
    </>
  );
};

export default DietaryPreferences;
