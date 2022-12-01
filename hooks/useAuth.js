import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';

import { auth } from '../firebase';

WebBrowser.maybeCompleteAuthSession();


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '953808248579-8eobvgg22tn7c409o0re6tc4dgm8hei3.apps.googleusercontent.com',
    iosClientId: '953808248579-k6gdf4u0ke9gckppofierbrsokt7r4es.apps.googleusercontent.com',
    androidClientId: '953808248579-fj2sium8q0fqhbvjhoufu7it7b3s9at2.apps.googleusercontent.com',
    webClientId: '953808248579-8eobvgg22tn7c409o0re6tc4dgm8hei3.apps.googleusercontent.com',
  });

  const signInwithGoogle = async () => {
    setLoading(true);

    await promptAsync();
  }

  const logout = () => {
    setLoading(true);
    signOut(auth).catch(error => setError(error)).finally(() => setLoading(false));
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, access_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential);
    }
    setLoading(false);
  }, [response]);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null)
    }

    setLoadingInitial(false);
  }), [])

  // const memoedValue = useMemo(() => (
  //   {
  //     user,
  //     loading,
  //     signInwithGoogle,
  //     logout,
  //     error
  //   }
  // ), [user, loading, error])

  return (
    <AuthContext.Provider value={ {
      user,
      loading,
      signInwithGoogle,
      logout,
      error
    }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}

