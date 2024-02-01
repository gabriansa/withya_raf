import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from './colors';


const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topContainer}>
        <Text style={styles.logo}>withya</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.termsText}>
          By tapping Sign in or Create account, you agree to our{' '}
          <Text style={styles.hyperlinkText} onPress={() => {/* Handle Terms of Service navigation */}}>
            Terms of Service
          </Text>
          . Learn how we process your data in our{' '}
          <Text style={styles.hyperlinkText} onPress={() => {/* Handle Privacy Policy navigation */}}>
            Privacy Policy
          </Text>
          {' '}and{' '}
          <Text style={styles.hyperlinkText} onPress={() => {/* Handle Cookies Policy navigation */}}>
            Cookies Policy
          </Text>
          .
        </Text>

        <TouchableOpacity
          style={styles.buttonCreateAccount}
          onPress={() => {}}
        >
          <Text style={styles.buttonTextCreateAccount}>Create account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSignin}
          onPress={() => {}}
        >
          <Text style={styles.buttonTextSignin}>Sign in</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 50,
    color: 'white',
    fontWeight: '200',
    letterSpacing: 8,
  },
  termsText: {
    color: colors.text_gray,
    textAlign: 'center',
    marginBottom: 20,
    width: '80%',
  },
  hyperlinkText: {
    color: colors.text_gray,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  buttonCreateAccount: {
    backgroundColor: colors.off_white,
    borderRadius: 20,
    padding: 19,
    width: '80%',
    margin: 10,
  },
  buttonTextCreateAccount: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: 'black'
  },
  buttonSignin: {
    borderWidth: 3,
    borderColor: colors.gray,
    borderRadius: 20,
    padding: 16,
    width: '80%',
    margin: 10,
  },
  buttonTextSignin: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: 'white'
  },
});

export default WelcomeScreen;
