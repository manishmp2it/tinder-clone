import { View, Text, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useRoute } from '@react-navigation/native'
import tw from "twrnc"
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { Ionicons } from '@expo/vector-icons'

const MessagesScreen = () => {

  const { user } = useAuth();
  const [input, setInput] = useState("");
  const { params } = useRoute();
  const [messages, setMessages] = useState([]);
  const { matchDetails } = params;

  useEffect(() => {
    onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')), snapshot => setMessages(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))));
  }, [matchDetails, db])

  const sendMessage = () => {

    if (input != "") {
      addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
      });
    }

    setInput('');
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled />


      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={10} >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            keyExtractor={item => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View style={tw`flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2`}>
          <TextInput
            style={tw`h-10 text-lg`}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          {/* <Button onPress={sendMessage} color="#FF5864" title="Send" /> */}
          <TouchableOpacity>
          <Ionicons name="send-sharp" size={28} color="#FF5864" onPress={sendMessage}/>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessagesScreen