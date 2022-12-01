import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { signInwithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <View style={tw`flex-1`}>
      <ImageBackground resizeMode='cover' style={tw`flex-1`} source={{ uri: "https://tinder.com/static/tinder.png" }}>
        <TouchableOpacity style={[tw`absolute bottom-30 w-52 bg-white p-4 rounded-2*l`,{marginHorizontal:"25%"}]} onPress={signInwithGoogle}>
          <Text style={tw`font-semibold text-center`}>Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen