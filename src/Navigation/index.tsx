import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import AboutScreen from '../Screens/About';
import { Text } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
// import HomeScreen from './screens/HomeScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
//     </Stack.Navigator>
//   );
// }

// function SettingsStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Settings" component={AboutScreen} />
//     </Stack.Navigator>
//   );
// }

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="HomeStack" component={HomeScreen} />
        <Tab.Screen  name="SettingsStack" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default DrawerNavigator;
