import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '953808248579-8eobvgg22tn7c409o0re6tc4dgm8hei3.apps.googleusercontent.com',
    iosClientId: '953808248579-k6gdf4u0ke9gckppofierbrsokt7r4es.apps.googleusercontent.com',
    androidClientId: '953808248579-fj2sium8q0fqhbvjhoufu7it7b3s9at2.apps.googleusercontent.com',
    webClientId: '953808248579-8eobvgg22tn7c409o0re6tc4dgm8hei3.apps.googleusercontent.com',
  });

  const signInwithGoogle = async () => {

    promptAsync();

    // await Google.useAuthRequest(config).then(async (logInResult) => {
    //   if (logInResult.type == 'success') {

    //   }
    // });
  }

  return (
    <AuthContext.Provider value={{
      user: null,
      signInwithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}

