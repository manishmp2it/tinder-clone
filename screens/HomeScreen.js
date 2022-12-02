import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc"
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
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
  const swipeRef = useRef(null);

  console.log(user)


  return (
    <SafeAreaView style={tw`flex-1`}>

      <View style={tw`flex-row items-center justify-between relative px-5`}>
        <TouchableOpacity onPress={logout} >
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("Modal")}>
          <Image style={tw`h-12 w-10`} resizeMode="contain" source={require('../assets/tinder-logo.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>

      </View>

      <View style={tw`flex-1 mt-5`}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("swpie left")
          }}
          onSwipedRight={() => {
            console.log("swipe right")
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            }
          }}
          renderCard={(card) => (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image style={tw`absolute top-0 h-full w-full rounded-xl`} source={{ uri: card.photoURL }} />

              <View style={tw`absolute bottom-0 bg-white w-full flex-row justify-between items-between px-6 py-2 rounded-b-xl h-20`}>
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.firstName} {card.lastName}</Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity onPress={()=>swipeRef.current.swipeLeft()} style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>swipeRef.current.swipeRight()} style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default HomeScreen