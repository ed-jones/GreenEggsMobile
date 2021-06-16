import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'Lato-Black': require('../../assets/fonts/Lato-Black.ttf'),
          'Lato-BlackItalic': require('../../assets/fonts/Lato-BlackItalic.ttf'),
          'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
          'Lato-BoldItalic': require('../../assets/fonts/Lato-BoldItalic.ttf'),
          'Lato-Italic': require('../../assets/fonts/Lato-Italic.ttf'),
          'Lato-Light': require('../../assets/fonts/Lato-Light.ttf'),
          'Lato-LightItalic': require('../../assets/fonts/Lato-LightItalic.ttf'),
          'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
          'Lato-Thin': require('../../assets/fonts/Lato-Thin.ttf'),
          'Lato-ThinItalic': require('../../assets/fonts/Lato-ThinItalic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
