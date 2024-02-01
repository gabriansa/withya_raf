import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ChatScreen = ({ navigation }) => {

    const messages = [
      { id: 1, text: "Hi", sender: "other" },
      { id: 2, text: "How are you?", sender: "other" },
      { id: 3, text: "I wish I knew...", sender: "user" },
      { id: 4, text: "What happened?", sender: "other" },
      { id: 5, text: "test test test test test test test test test test test test test test test test test test test test", sender: "other" },
      // ... more messages ...
    ];
    
    const renderMessage = ({ item }) => {
      const isUserMessage = item.sender === 'user';
      return (
          <View style={[
              styles.messageBubble,
              isUserMessage ? styles.userMessage : styles.otherMessage
          ]}>
              <Text style={styles.messageText}>{item.text}</Text>
          </View>
      );
    };

    return (
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />

            <View style={styles.barContainer}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                        <Ionicons name="arrow-back-circle" size={50} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.emotionContainer}>
                    <Text style={styles.smallText}>You</Text>
                    <Text style={styles.emotionText}>Uneasy</Text>
                </View>

                <View style={styles.emotionCirclesContainer}>
                    <View style={styles.circleLeft}></View>
                    <View style={styles.circleRight}></View>
                </View>

                <View style={styles.emotionContainer}>
                    <Text style={styles.smallText}>Partner</Text>
                    <Text style={styles.emotionText}>Lost</Text>
                </View>

                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                        <Ionicons name="close-circle" size={50} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <View style={styles.chatContainer}>
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id.toString()}
                        style={styles.flatListContainer}
                    />
                </View>

                <View style={styles.textingContainer}>
                    <View style={styles.inputMessage} >
                        <TextInput 
                            style={styles.inputMessageText} 
                            keyboardType="default"
                            placeholder="Message"
                            multiline={true}
                            numberOfLines={1}
                            placeholderTextColor="gray"
                            keyboardAppearance="dark"
                        />
                    </View>
                    <View style={styles.sendMessageContainer}>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Ionicons name="arrow-up-circle" size={40} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '95%',
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    opacity: 0.2,
    // backgroundColor: 'red',
  },
  emotionContainer: {
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  emotionCirclesContainer: {
    flex: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,

    // backgroundColor: 'blue',
  },
  sendMessageContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  textingContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  flatListContainer: {
  },
  smallText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'left',
  },
  emotionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#76A8F0',
  },
  circleLeft: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: '#EB8366',
    left: 10,
    opacity: 0.5,
  },
  circleRight: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: '#76A8F0',
    right: 10,
    opacity: 0.5,
  },
  inputMessage: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    minHeight: 40,
    maxHeight: 300,
    paddingVertical: 5,
  },
  inputMessageText: {
    fontSize: 16,
    color: 'white',
    paddingBottom: 4,
  },
  messageBubble: {
    maxWidth: '70%',
    marginVertical: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 40,
    justifyContent: 'center',
  },
  userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#5E5E5E', // Blue color for the user's messages
  },
  otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#212121', // Different color for the other's messages
  },
  messageText: {
      color: 'white',
      fontSize: 16,
  },
});

export default ChatScreen;
