import React, { useState } from "react";
import {
  Button,
  IndexPath,
  List,
  ListItem,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { Alert, Icons, Mutations, Queries } from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Select, SelectItem } from "@ui-kitten/components";
import { DocumentNode, useMutation, useQuery } from "@apollo/client";
import {
  Diets,
  Diets_diets_data,
  Me,
  Me_me_data,
  RemoveDietaryPreferences,
  RemoveDietaryPreferencesVariables,
  UpdateDietaryPreferences,
  UpdateDietaryPreferencesVariables,
} from "@greeneggs/types/graphql";
import LoadingScreen from "../loading/LoadingScreen";
import { FullUserFragment } from "@greeneggs/graphql/fragments";

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

function indexToNumber(selectedIndex: IndexPath | IndexPath[]) {
  return Number(selectedIndex.toString()) - 1;
}

interface SelectPrefsTemplateProps<QueryType> {
  query: DocumentNode;
  removeMutation: DocumentNode;
  updateMutation: DocumentNode;
  queryString: keyof QueryType;
  preferenceType: keyof Me_me_data;
}

const SelectPrefsTemplate = <
  QueryType,
  RemoveMutationType,
  RemoveMutationVariablesType,
  UpdateMutationType,
  UpdateMutationVariables
>({
  query,
  removeMutation,
  updateMutation,
  queryString,
  preferenceType
}: SelectPrefsTemplateProps<QueryType>) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const getData = useQuery<QueryType>(query);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  const getMe = useQuery<Me>(Queries.ME);

  const [remove] = useMutation<RemoveMutationType, RemoveMutationVariablesType>(
    removeMutation
  );
  const [update, updateResult] = useMutation<
    UpdateMutationType,
    UpdateMutationVariables
  >(updateMutation);

  if (getData.loading || getMe.loading) return <LoadingScreen />;
  if (getData.error) {
    return <Text>Error! {getData.error.message}</Text>;
  }
  if (getMe.error) {
    return <Text>Error! {getMe.error.message}</Text>;
  }
  const me = getMe.data?.me.data;
  const diets = getData.data?[queryString].data || [];
  const unselectedDiets = diets.filter(
    (diet) => !me?.dietaryPreferences.includes(diet)
  );

  function handleSubmit() {
    if (me?[preferenceType]) {
      update({
        variables: {
          [preferenceType]: {
            diets: [
              ...me.dietaryPreferences.map((selectedDiet) => selectedDiet.id),
              unselectedDiets[indexToNumber(selectedIndex)].id,
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
                  unselectedDiets[indexToNumber(selectedIndex)],
                ]),
              ],
            },
            fragment: FullUserFragment,
            fragmentName: "FullUserFragment",
          });
        },
      });
    }
    setSelectedIndex(new IndexPath(0));
  }

  function removeDiet(diet: Diets_diets_data) {
    if (me?.dietaryPreferences) {
      remove({
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
      <View>
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
              disabled={unselectedDiets.length === 0}
              value={
                unselectedDiets[indexToNumber(selectedIndex)]?.name ||
                "NO DIETS FOUND"
              }
            >
              {unselectedDiets.map((diet) => (
                <SelectItem key={diet.id} title={diet.name} />
              ))}
            </Select>
            <Button
              size="small"
              onPress={handleSubmit}
              disabled={unselectedDiets.length === 0}
              accessoryLeft={
                updateResult.loading
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
      </View>
    </>
  );
};

export default SelectPrefsTemplate;
