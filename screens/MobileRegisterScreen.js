import { View, Text, TouchableOpacity, TextInput, Platform, Alert, } from 'react-native'
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import tw from "twrnc"
import { app, auth } from '../firebase';
import PhoneInput from "react-native-phone-number-input";
import OtpInputs from 'react-native-otp-inputs';


const MobileRegisterScreen = () => {

    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [code, setCode] = useState('');
    const phoneInput = useRef(null);

    const firebaseConfig = app ? app.options : undefined;

    console.log(phoneNumber);


    console.log(firebaseConfig);

    const sendVerification = async () => {

        const phoneProvider = new PhoneAuthProvider(auth);

        try {
            const verificationid = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
            setVerificationId(verificationid);
            alert("code send successfully");
        } catch (err) {
            console.log(err.message)
        }
    };

    const confirmCode = () => {
        const credential = PhoneAuthProvider.credential(verificationId, code);

        signInWithCredential(auth, credential)
            .then((result) => {
                console.log(result);
            });
    };

    return (
        <View style={tw`flex-1 items-center pt-1 `}>
            <View style={tw`flex-1 justify-center items-center`}>
                {/* {
                firebaseConfig && <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
            } */}
                <Text style={tw`text-xl text-gray-500 p-2 font-bold text-3xl`}>Welcome </Text>

                <Text style={tw`text-center text-red-400 p-4 text-xl font-bold`}>Enter Mobile No. </Text>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    onChangeFormattedText={(text) => {
                        setPhoneNumber(text);
                    }}
                    autoFocus
                />
                <TouchableOpacity style={[tw`mt-3 p-4 rounded-2xl bg-red-400`,]} onPress={sendVerification}>
                    <Text style={tw`text-white font-bold`}>Send Verification</Text>
                </TouchableOpacity>

                <TextInput
                    style={tw`text-center text-xl pb-2`}
                    placeholder="Confirmation Code"
                    onChangeText={setCode}
                    keyboardType="number-pad"
                />
                {/* <OtpInputs
                    handleChange={(code) => console.log(code)}
                    numberOfInputs={6}
                /> */}
                <TouchableOpacity onPress={confirmCode}>
                    <Text>Send Verification</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default MobileRegisterScreen