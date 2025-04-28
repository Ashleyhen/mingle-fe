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
import Group from '@/components/Group';
import LeaguePage from '@/components/LeaguePage';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="New Account">
          {(props: any) => <Account {...props} mode="new" />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Logout' }} />
        <Stack.Screen name="Group" options={{ title: 'Home' }}
          children={(props: any) => <Group {...props} mode="new" />}
        />

        <Stack.Screen name="LeaguesPage" options={{ title: 'Home' }}
          children={(props: any) => <LeaguePage {...props} mode="new" />}
        />

        <Stack.Screen name="Edit Account">
          {(props:any) => <Account {...props} mode="edit" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
</NavigationIndependentTree>
  );
}

