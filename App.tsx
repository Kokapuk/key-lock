import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './components/Header';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import StyleVars from './styles/styleVars';
import SignUp from './screens/SignUp';
import * as SystemUI from 'expo-system-ui';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

const App = () => {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(StyleVars.bgDark);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: StyleVars.bgDark },
              headerShadowVisible: false,
              navigationBarColor: StyleVars.bgDark,
              animationDuration: StyleVars.animationDuration,
            }}
          >
            <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="Home" component={Home} options={{ header: () => <Header /> }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
