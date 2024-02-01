import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import WelcomeScreen from './screens/WelcomeScreen';
import PhoneNumberScreen from './screens/PhoneNumberScreen';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import EmotionsScreen from './screens/EmotionsScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';

import TestScreen from './screens/TestScreen';

export default function App() {
  return (
      <EmotionsScreen />
  );
}