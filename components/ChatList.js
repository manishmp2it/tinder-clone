import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import ChatRow from './ChatRow';

const ChatList = () => {
    const [matches,setMatches]=useState([]);

    const {user}=useAuth();

    console.log(matches);

    useEffect(()=>{
        onSnapshot(query(collection(db,'matches'),where('userMatched','array-contains',user.uid)),(snapshot)=>setMatches(snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data(),
        }))))
    },[user])
  return (
    matches.length > 0 ?(
        <FlatList
        data={matches}
        keyExtractor={item=>item.id}
        renderItem={({item})=><ChatRow matchDetails={item}/>}
        />
    ):(
        <View style={tw`p-5`}>
            <Text style={tw`text-center text-lg`}>No matches at the moment 😟</Text>
        </View>
    )
  )
}

export default ChatList