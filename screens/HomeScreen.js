import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc"
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';


const DUMMY_DATA = [
  {
    firstName: "Manish",
    lastName: "sain",
    occupation: "Software developer",
    photoURL: "https://www.pinkvilla.com/imageresize/aa_monchrome_look.jpeg?width=752&t=pvorg",
    age: 25,
    id: 123,
  },
  {
    firstName: "Manish",
    lastName: "sain",
    occupation: "Software developer",
    photoURL: "https://i.pinimg.com/originals/bd/4d/d4/bd4dd48f0ea32bac0ba4e89ae652c262.jpg",
    age: 25,
    id: 456
  },
  {
    firstName: "Manish",
    lastName: "sain",
    occupation: "Software developer",
    photoURL: "https://www.pinkvilla.com/imageresize/aa_monchrome_look.jpeg?width=752&t=pvorg",
    age: 25,
    id: 789
  },
  {
    firstName: "Manish",
    lastName: "sain",
    occupation: "Software developer",
    photoURL: "https://i.pinimg.com/originals/bd/4d/d4/bd4dd48f0ea32bac0ba4e89ae652c262.jpg",
    age: 25,
    id: 101
  }

]


const HomeScreen = () => {
  const navigation = useNavigation();

  const { user, logout } = useAuth();

  console.log(user)


  return (
    <SafeAreaView style={tw`flex-1`}>

      <View style={tw`flex-row items-center justify-between relative px-5`}>
        <TouchableOpacity onPress={logout} >
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={tw`h-12 w-10`} source={require('../assets/tinder-logo.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>

      </View>



      <View style={tw`flex-1 mt-5`}>
        <Swiper
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image style={tw`absolute top-0 h-full w-full rounded-xl`} source={{uri:card.photoURL}} />
            </View>
          )}
        />
      </View>


    </SafeAreaView>
  )
}

export default HomeScreen