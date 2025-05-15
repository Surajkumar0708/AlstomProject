import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import DashboardScreen from '../screens/dashboard';
import AlbumDetailsScreen from '../screens/albumDetails';

const Stack = createNativeStackNavigator();

const OrientationLocker = () => {
  Orientation.unlockAllOrientations();
  return null;
};

const RootStack = () => {
  return (
    <SafeAreaProvider>
      <OrientationLocker />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;
