import { View, Text, TouchableOpacity, TextInput, Platform, Alert, StyleSheet, KeyboardAvoidingView, } from 'react-native'
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import tw from "twrnc"
import { app, auth } from '../firebase';
import PhoneInput from "react-native-phone-number-input";
import OtpInputs from 'react-native-otp-inputs';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';


const MobileRegisterScreen = () => {

    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [code, setCode] = useState('');
    const phoneInput = useRef(null);

    const CELL_COUNT = 6;

    const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        code,
        setValue: setCode,
    });

    const firebaseConfig = app ? app.options : undefined;

    const sendVerification = async () => {

        const phoneProvider = new PhoneAuthProvider(auth);

        try {
            const verificationid = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
            setVerificationId(verificationid);
            Toast.show({
                type: 'success',
                text1: 'OTP Sent Successfully 👋',
            });
        } catch (err) {
            console.log(err.message)
        }
    };

    const confirmCode = () => {
        const credential = PhoneAuthProvider.credential(verificationId, code);

        signInWithCredential(auth, credential)
            .then((result) => {
                console.log(result);
            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Please Enter correct OTP'
                });
            });
    };

    return (
        <View style={tw`flex-1 items-center pt-1 `}>
            <Toast />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw`flex-1`}
                keyboardVerticalOffset={10} >
                <>
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
                            disabled={verificationId ? true : false}
                        />
                        <View style={tw`flex-row justify-center`}>
                            {verificationId ? <TouchableOpacity style={[tw`mt-3 p-4 rounded-2xl`,]} onPress={() => setVerificationId(null)}>
                                <Text style={tw`text-red-400 font-bold`}>Change Mobile no</Text>
                            </TouchableOpacity> : null}
                            <TouchableOpacity style={[tw`mt-3 p-4 rounded-2xl bg-red-400`,]} onPress={sendVerification}>
                                {verificationId ? <Text style={tw`text-white font-bold`}>ReSend OTP</Text> : <Text style={tw`text-white font-bold`}>Send OTP</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {verificationId ? <View style={tw`flex-1 justify-center items-center`}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={code}
                            onChangeText={setCode}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFiledRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                    onLayout={getCellOnLayoutHandler(index)}
                                    key={index}
                                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                    <Text style={styles.cellText}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                        <TouchableOpacity style={[tw`mt-4 p-4 rounded-2xl bg-red-400`,]} onPress={confirmCode}>
                            <Text style={tw`text-white font-bold`}>Verify</Text>
                        </TouchableOpacity>
                    </View> : null}
                </>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MobileRegisterScreen

const styles = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFiledRoot: {
        marginTop: 20,
        width: '80%',
        justifyContent: "center",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 40,
        height: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 26,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
})