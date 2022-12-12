import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {

  const { signInwithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })
  // https://tinder.com/static/tinder.png
  return (
    <View style={tw`flex-1`}>
      <ImageBackground resizeMode='cover' style={tw`flex-1`} >
        <TouchableOpacity style={[tw`flex-row items-center justify-evenly absolute bottom-40 w-70 bg-white p-4 rounded-2xl`, { marginHorizontal: "15%" }]} onPress={signInwithGoogle}>
         <View><Text style={tw`font-semibold text-center`}>Sign in & get swiping</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={[tw`flex-row items-center justify-evenly absolute bottom-22 w-70 bg-white p-4 rounded-2xl`, { marginHorizontal: "15%" }]} onPress={() => navigation.navigate("MobileRegister")}>
           <View><Text style={tw` font-semibold text-center`}>Login with Mobile </Text></View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen