import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import CartScreen from './screens/CartScreen';
import DetailScreen from './screens/DetailScreen';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import MidtransScreen from './screens/MidtransScreen';
import CheckProductScreen from './screens/CheckProductScreen';
const Stack = createNativeStackNavigator();
import SocketContext, { socket } from './config/socket';

export default function App() {
  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Midtrans"
            component={MidtransScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CheckProduct"
            component={CheckProductScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </SocketContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
