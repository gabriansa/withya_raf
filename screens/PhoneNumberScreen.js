import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import PhoneInput from "react-native-phone-number-input";
import { DARK_THEME } from 'react-native-country-picker-modal'
import colors from './colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PhoneNumberScreen = () => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);

  const checkPhoneNumber = (text) => {
    setValue(text);
    const isValid = phoneInput.current?.isValidNumber(text);
    setValid(isValid);
    console.log(text)
    console.log(isValid)
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.cancelButtonContainer}>
            <TouchableOpacity onPress={() => {}}>
            <Ionicons name="close" size={35} color="white" />
            </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>What's your phone number?</Text>
            </View>

            <PhoneInput 
                ref={phoneInput}
                defaultCode="US"
                defaultValue={value}
                onChangeFormattedText={checkPhoneNumber}
                containerStyle={styles.phoneContainerStyle}
                textContainerStyle={styles.phoneTextContainerStyle}
                textInputStyle={styles.phoneTextInputStyle}
                codeTextStyle={styles.phoneCodeTextStyle}
                flagButtonStyle={styles.phoneFlagButtonStyle}
                renderDropdownImage={<Ionicons name="caret-down" size={14} color='gray' />}
                textInputProps={{
                    placeholder: 'Phone number',
                    placeholderTextColor: colors.gray // Set your desired color here
                  }}
                layout='second'
                // Add custom styles to the country picker
                withDarkTheme
                countryPickerProps={{
                  theme: DARK_THEME, 
                  preferredCountries: ['US', 'CA', 'MX'],
                  withAlphaFilter: false,
                }}
            />

            <View style={styles.disclaimerContainer}>
                <Text style={styles.smallText}>withya will send you a text with a verification code. Message and data rates may apply</Text>
            </View>

            <View style={styles.nextButtonContainer}>
                <TouchableOpacity disabled={!valid} onPress={() => {}}>
                    <Ionicons name="arrow-forward-circle" size={60} color={valid ? colors.off_white : colors.gray} />
                </TouchableOpacity>
            </View>

        </View>

        <View style={styles.dummyContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainContainer: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dummyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  disclaimerContainer: {
    width: '85%',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  titleContainer: {
    marginBottom: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
  smallText: {
    color: colors.text_gray,
    fontSize: 14,
    textAlign: 'left',
  },
  nextButtonContainer: {
    marginBottom: 20,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'flex-end'
  },
  cancelButtonContainer: {
    opacity: '0.2',
    marginTop: 10,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },

  phoneContainerStyle: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: '85%',
  },
  phoneTextContainerStyle: {
    backgroundColor: 'black',
    borderRadius: 20,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 18,
  },
  phoneTextInputStyle: {
    color: 'white',
    fontSize: 18,
  },
  phoneCodeTextStyle: {
    color: colors.text_gray,
    fontSize: 18,
    fontWeight: '500',
  },
  phoneFlagButtonStyle: {
    backgroundColor: 'black',
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 18,
    marginRight: 10,
    // width: 100
  },

});

export default PhoneNumberScreen;
