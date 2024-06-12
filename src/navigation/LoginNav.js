import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecoverPasswordScreen from '../screens/changePasswordsScreen';

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
      <Stack.Screen
        name='RecoverPassword'
        options={{ headerShown: false }}
      >
        {props => <RecoverPasswordScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
