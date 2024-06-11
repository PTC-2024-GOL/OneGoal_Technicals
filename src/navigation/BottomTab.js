import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab({ logueado, setLogueado }) {
  // Función para renderizar HomeScreen con props
  const renderHomeScreen = props => (
    <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} />
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Equipos') {
            iconName = focused ? 'football' : 'football-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFC300',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerStyle: {
          backgroundColor: '#FFC300',
        },
        headerTintColor: '#fff',
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen
        name="Equipos"
        component={LoginScreen}
        options={{
          title: 'Equipos',
        }}
      />
      <Tab.Screen
        name="Inicio"
        component={renderHomeScreen}
        options={{
          title: 'Inicio',
          tabBarButton: props => (
            <CustomTabBarButton {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={LoginScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

const CustomTabBarButton = ({ children, onPress }) => (
  <View style={styles.customButtonContainer}>
    <View style={styles.shadow}>
      <Ionicons name="home" size={30} color="#fff" style={styles.customButtonIcon} />
    </View>
    <View style={styles.customButton}>
      <TouchableOpacity
        style={styles.customButtonTouchable}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#000080',
    borderRadius: 15,
    height: 90,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  customButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000080',
  },
  customButtonTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonIcon: {
    color: '#FFC300',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
