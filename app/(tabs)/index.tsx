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
import GroupPage from '@/components/GroupPage';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationIndependentTree>
      <ErrorAlertProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="New Account">
          {(props: any) => <Account {...props} mode="new" />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Logout' }} />
        <Stack.Screen name="GroupPage" options={{ title: 'Home' }}
          children={(props: any) => <GroupPage {...props} mode="new" />}
        />

        <Stack.Screen name="LocationPage" options={{ title: 'Home' }}
          children={(props: any) => <LocationPage {...props} mode="new" />}
        />


        <Stack.Screen name="LeaguesPage" options={{ title: 'Home' }}
          children={(props: any) => <LeaguePage {...props} mode="new" />}
        />

        <Stack.Screen name="Edit Account">
          {(props:any) => <Account {...props} mode="edit" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
</ErrorAlertProvider>
</NavigationIndependentTree>
  );
}

