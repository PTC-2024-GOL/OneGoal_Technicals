import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

export default function LoginNav({ logueado, setLogueado }) {
  return (
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen
        name='LoginScreen'
        options={{ headerShown: false }}
      >
        {props => <LoginScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
          name='WelcomeScreen'
          options={{headerShown: false}}
          component= {WelcomeScreen}>
      </Stack.Screen>
    </Stack.Navigator>
  );
}
