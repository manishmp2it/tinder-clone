import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from "expo-google-app-auth"


const AuthContext=createContext({});

const config={
  androidClientId:'953808248579-fj2sium8q0fqhbvjhoufu7it7b3s9at2.apps.googleusercontent.com',
  iosClientId:'953808248579-k6gdf4u0ke9gckppofierbrsokt7r4es.apps.googleusercontent.com',
  webClientId:'953808248579-ir1gnrref3nudh1qtr550bjcb6cc6e2d.apps.googleusercontent.com',
  scopes:["profile","email"],
  permissions:["public_profile","email","gender","location"]
}

export const AuthProvider = ({children}) => {

    const signInwithGoogle = async()=>{
        await Google.logInAsync(config).then(async (logInResult)=>{
          if(logInResult.type=='success'){

          }
        });
    }
    
  return (
    <AuthContext.Provider value={{
        user:null,
        signInwithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
    return useContext(AuthContext)
}

