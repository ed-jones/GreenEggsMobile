import { useContext } from "react";
import { UserContext } from "@greeneggs/providers";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigateToProfile = (userId: string) => void;

export function useNavigateToProfile(): NavigateToProfile {
  const { me } = useContext(UserContext);
  const navigation: StackNavigationProp<any, any> = useNavigation();

  function navigateToMyProfile() {
    navigation.reset({
      routes: [{ name: "Home" }],
    });
    navigation.navigate("MyProfile", { index: 4})
  }

  return (userId) =>
    me?.id === userId
      ? navigateToMyProfile()
      : navigation.navigate("Profile", {
            userId,
          });
}
