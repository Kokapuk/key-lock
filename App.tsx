import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchHeader from './components/SearchHeader';
import Editor from './screens/Editor';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import useAuthStore from './store/auth';
import TransitionPresets from './styles/TransitionPresets';
import StyleVars from './styles/styleVars';
import EditorHeader from './components/EditorHeader';

const Stack = createStackNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: StyleVars.bgDark,
  },
};

const App = () => {
  const isSignedIn = useAuthStore((state) => !!state.token);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(StyleVars.bgDark);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerShadowVisible: false,
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
              headerMode: 'screen',
            }}
          >
            {isSignedIn ? (
              <>
                <Stack.Screen name="Home" component={Home} options={{ header: () => <SearchHeader /> }} />
                <Stack.Screen
                  name="Editor"
                  component={Editor}
                  options={{
                    header: () => <EditorHeader />,
                    cardStyleInterpolator: TransitionPresets.forHorizontalIOS,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    gestureResponseDistance: Dimensions.get('window').width,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen
                  name="Sign Up"
                  component={SignUp}
                  options={{
                    headerShown: false,
                    cardStyleInterpolator: TransitionPresets.forFade,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
