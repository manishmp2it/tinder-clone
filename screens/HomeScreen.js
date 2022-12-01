import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc"


const HomeScreen = () => {
  const navigation = useNavigation();

  const { user, logout } = useAuth();

  console.log(user)


  return (
    <SafeAreaView>

      <View>
        <TouchableOpacity style={tw`absolute left-5 top-3`}>
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL }} />
        </TouchableOpacity>
      </View>

      <Text>HomeScreen</Text>
      <Button title='Go to chat sc' onPress={() => navigation.navigate('Chat')} />
      <Button title='Logout' onPress={logout} />

    </SafeAreaView>
  )
}

export default HomeScreen