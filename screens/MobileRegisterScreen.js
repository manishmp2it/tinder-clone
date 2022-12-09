import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import tw from "twrnc"
import { app, auth } from '../firebase';


const MobileRegisterScreen = () => {

    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [code, setCode] = useState('');
    
    const firebaseConfig = app ? app.options : undefined;
    
    const sendVerification = () => {
        
        const phoneProvider = new PhoneAuthProvider(auth);
        
        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
    };

    const confirmCode = () => {
        const credential = PhoneAuthProvider.credential(verificationId, code);

        signInWithCredential(credential)
            .then((result) => {

                console.log(result);
            });
    };

    return (
        <View style={tw`flex-1 items-center pt-1`}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Welcome </Text>

            <Text style={tw`text-center text-red-400 p-4 font-bold`}>Enter Mobile No. </Text>
            <TextInput
            style={tw`text-center text-xl pb-2`}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoCompleteType="tel"
            />
            <TouchableOpacity onPress={sendVerification}>
                <Text>Send Verification</Text>
            </TouchableOpacity>

            <TextInput
            style={tw`text-center text-xl pb-2`}
                placeholder="Confirmation Code"
                onChangeText={setCode}
                keyboardType="number-pad"
            />
            <TouchableOpacity onPress={confirmCode}>
                <Text>Send Verification</Text>
            </TouchableOpacity>

        </View>
    )
}

export default MobileRegisterScreen