import { View, Text, } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './screens/ModalScreen';
import MatchedScreen from './screens/MatchedScreen';
import MessagesScreen from './screens/MessagesScreen';
import MobileRegisterScreen from './screens/MobileRegisterScreen';
// import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessagesScreen} />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchedScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="MobileRegister" component={MobileRegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
          {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
           
          </Stack.Group> */}
        </>
      )}



    </Stack.Navigator>
  )
}

export default StackNavigator