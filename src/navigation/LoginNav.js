import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecoverPasswordScreen from '../screens/changePasswordsScreen';
import PlayersScreen from '../screens/PlayersScreen';
import PlayersDetails from "../screens/PlayersDetails";
import playersDetails from "../screens/PlayersDetails";

const Stack = createStackNavigator();

export default function LoginNav({ logueado, setLogueado }) {
  return (
    <Stack.Navigator
        initialRouteName='WelcomeScreen'
        screenOptions={({ route }) => ({
            headerStyle: {
                backgroundColor: '#0078B7',
                borderBottomRightRadius: 35,
                borderBottomLeftRadius: 35,
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        })}>

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
      <Stack.Screen
         name='Jugadores'
         options={{headerShown: true}}
      >
        {props => <PlayersScreen{...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
         name='PlayersDetails'
         options={{headerShown: false}}
      >
        {props => <PlayersDetails{...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
