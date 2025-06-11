import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '@/components/SignInScreen';
import HomeScreen from '@/components/HomeScreen';
import Account from '@/components/Account';
import LeaguePage from '@/components/LeaguePage';
import LocationPage from '@/components/LocationPage';
import { ErrorAlertProvider } from '@/components/ui/dialogBoxs/ErrorAlertContext';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/store';
import GroupPage from '@/components/GroupPage';
import { useAutoDiscovery } from 'expo-auth-session';
import { issuer } from '@/constants/env';
import { refreshAccessToken } from '@/store/authSlice';
const Stack = createStackNavigator();

function AppWithHooks() {
  const asyncDispatch = useDispatch<AppDispatch>();
  const discovery = useAutoDiscovery(issuer);

  const refreshToken = async () => {
    if (discovery) {
      return await asyncDispatch(refreshAccessToken(discovery));
    }
  };

  const screens = [
    { name: 'Login', component: SignInScreen },
    { name: 'New Account', render: (props: any) => <Account {...props} mode="new" /> },
    { name: 'Home', component: HomeScreen, options: { title: 'Logout' } },
    {
      name: 'GroupPage',
      render: (props: any) => <GroupPage {...props} mode="new" refreshToken={refreshToken} />,
      options: { title: 'Home' },
    },
    {
      name: 'LocationPage',
      render: (props: any) => <LocationPage {...props} mode="new" refreshToken={refreshToken} />,
      options: { title: 'Home' },
    },
    {
      name: 'LeaguesPage',
      render: (props: any) => <LeaguePage {...props} mode="new" refreshToken={refreshToken} />,
      options: { title: 'Home' },
    },
    {
      name: 'Edit Account',
      render: (props: any) => <Account {...props} mode="edit" refreshToken={refreshToken} />,
    },
  ];

  return (
    <NavigationIndependentTree>
      <ErrorAlertProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {screens.map(({ name, component, render, options }) =>
              component ? (
                <Stack.Screen key={name} name={name} component={component} options={options} />
              ) : (
                <Stack.Screen key={name} name={name} options={options}>
                  {render}
                </Stack.Screen>
              )
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorAlertProvider>
    </NavigationIndependentTree>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWithHooks />
    </Provider>
  );
}

