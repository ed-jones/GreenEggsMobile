import React from "react";
import {
  Button,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import {
  Alert,
  ControlledInput,
  Icons,
  InputType,
  Mutations,
  Queries,
  Rules,
  useForm,
} from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Me,
  ProfileVisibilityDetails,
  UpdateProfileVisibility,
  UpdateProfileVisibilityVariables,
} from "@greeneggs/types/graphql";
import { useQuery } from "@apollo/client";
import { FullUserFragment } from "@greeneggs/graphql/fragments";

import LoadingScreen from "../loading/LoadingScreen";
import { TopNavigation } from "@greeneggs/ui";
import Background from "@greeneggs/core/background";

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

const ProfileVisibility = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { loading, error, data } = useQuery<Me>(Queries.ME);
  const form = useForm<
    ProfileVisibilityDetails,
    UpdateProfileVisibility,
    UpdateProfileVisibilityVariables
  >(Mutations.UPDATE_PROFILE_VISIBILITY, "profileVisibilityDetails");

  if (loading) return <LoadingScreen />;
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }
  const me = data?.me.data;

  function handleSubmit() {
    form
      .submitForm({
        variables: {
          profileVisibilityDetails: {
            visibility: form.getValues("visibility"),
          },
        },
        update: (cache) => {
          if (me?.id) {
            cache.writeFragment({
              id: `FullUser:${me.id}`,
              data: {
                ...me,
                visibility: form.getValues("visibility"),
              },
              fragment: FullUserFragment,
              fragmentName: "FullUserFragment",
            });
          }
        },
      })
      .then(() => navigation.goBack())
      .catch((error) => console.error(error));
  }

  return (
    <Background>
      <TopNavigation title="Profile Visibility"/>
      <ScrollView style={styles.view}>
        <Alert
          message={
            <Text>
              Here you can control which users are able to follow you.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>EVERYONE</Text> means your
              profile is public and anyone can follow you.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>FRIENDS</Text> means your
              profile is only visible to friends and you have to approve follow
              requests.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>ONLY ME</Text> means nobody
              can follow you. Your profile is hidden and you won't appear in any
              searches.{"\n\n"}
            </Text>
          }
          type="info"
        />
        <ControlledInput<ProfileVisibilityDetails>
          controllerProps={{
            name: "visibility",
            control: form.control,
            rules: {
              ...Rules.REQUIRED,
            },
            defaultValue: me?.visibility,
          }}
          submitError={form.formResult.data?.updateProfileVisibility.error}
          type={InputType.PRIVACY}
        />
        <Button
          onPress={handleSubmit}
          accessoryRight={
            form.formResult.loading
              ? () => <Spinner size="small" status="control" />
              : Icons.Save
          }
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </Background>
  );
};

export default ProfileVisibility;
