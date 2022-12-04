import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useRoute } from '@react-navigation/native'

const MessagesScreen = () => {

    const user = useAuth();

    const {params} = useRoute();
    const {matchDetails} =params;

  return (
    <SafeAreaView>
      <Header title={getMatchedUserInfo(matchDetails?.users,user.uid).displayName} callEnabled />
    </SafeAreaView>
  )
}

export default MessagesScreen