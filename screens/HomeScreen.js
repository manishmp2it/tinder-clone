import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc"
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { collection, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { async } from '@firebase/util';
import generateId from '../lib/genereteId';


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
  const [profiles, setProfiles] = useState([])
  const swipeRef = useRef(null);

  console.log(user)

  useLayoutEffect(() =>
    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    }),
    []);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {

      const passes = await getDocs(collection(db, "users", user.uid, "passes")).then((snapshot) => snapshot.docs.map((doc) => doc.id))
      const swipes = await getDocs(collection(db, "users", user.uid, "swipes")).then((snapshot) => snapshot.docs.map((doc) => doc.id))

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      console.log(passes)

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(snapshot.docs.filter((doc) => doc.id !== user.uid).map(doc => ({
            id: doc.id,
            ...doc.data()
          })))
        })
    }

    fetchCards();
    return unsub;
  }, [])

  console.log(profiles)

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped)
  }

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (await getDoc(doc(db,'users',user.uid))).data();

    //check if user swiped on you...

    getDoc(doc(db,"users",userSwiped.id,"swipes",user.uid)).then((documentSnapshot)=>{
      if(documentSnapshot.exists()){

          console.log(`you matched with ${userSwiped.displayName}`);

         setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped)

          //Create a Match

          setDoc(doc(db,'matches',generateId(user.uid,userSwiped.id)),{
            users:{
              [user.uid]:loggedInProfile,
              [userSwiped.id]:userSwiped
            },
            userMatched:[user.uid,userSwiped.id],
            timestamp:serverTimestamp()
          });

          navigation.navigate('Match',{
            loggedInProfile,
            userSwiped,
          })

      }else{
        console.log(`you swiped on ${userSwiped.displayName}`);
       setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped)
      }
    })

  }


  return (
    <SafeAreaView style={tw`flex-1`}>

      <View style={tw`flex-row items-center justify-between relative px-5`}>
        <TouchableOpacity onPress={logout} >
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL || "" }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image style={tw`h-12 w-10`} resizeMode="contain" source={require('../assets/tinder-logo.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>

      </View>

      <View style={tw`flex-1 mt-0`}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("swpie left")
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("swipe right")
            swipeRight(cardIndex);
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
          renderCard={(card) => card ? (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image style={tw`absolute top-0 h-full w-full rounded-xl`} resizeMode="cover" source={{ uri: card.photoURL }} />

              <View style={tw`absolute bottom-0 bg-white w-full flex-row justify-between items-between px-6 py-2 rounded-b-xl h-20`}>
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.displayName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          ) : (
            <View style={[tw`relative bg-white h-3/4 rounded-xl justify-center items-center`, styles.cardShadow]}>
              <Text style={tw`font-bold pb-5`}>No more profiles</Text>
              <Image
                style={tw`h-20 w-full`}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/6gb" }}
              />
            </View>
          )}
        />
      </View>

      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }
})

export default HomeScreen