import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import colors from './colors';
import { CircularCarousel } from './components/circular-crousel';
import high_positive_data from './emotion_data/high_positive.json';
import low_positive_data from './emotion_data/low_positive.json';
import low_negative_data from './emotion_data/low_negative.json';
import high_negative_data from './emotion_data/high_negative.json';

const EmotionsScreen = () => {
  const [activeCarousel, setActiveCarousel] = useState('');
  const [resetScroll, setResetScroll] = useState({ carousel1: false, carousel2: false, carousel3: false, carousel4: false });
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isReadyModalVisible, setIsReadyModalVisible] = useState(false);
  const [item, setItem] = useState('');

  const handleReadyResponse = (response) => {
    setIsReadyModalVisible(false);
    // Add additional logic for user response if needed
  };

  const handleCarouselScrollBegin = (carouselNumber) => {
    setActiveCarousel(carouselNumber);
    setResetScroll({
      carousel1: carouselNumber !== 1,
      carousel2: carouselNumber !== 2,
      carousel3: carouselNumber !== 3,
      carousel4: carouselNumber !== 4,
    });
    setIsItemSelected(false);
  };

  const handleSelectedItemChange = useCallback((selectedItem, carouselNumber) => {
    if (selectedItem) {
      console.log(`Selected Item - ID: ${selectedItem.id}, Text: ${selectedItem.text}, Color: ${selectedItem.color}`);
      setItem(selectedItem);
      setIsItemSelected(true);
      setActiveCarousel(carouselNumber);
  
      // Reset the scroll of other carousels
      setResetScroll(prevState => ({
        ...prevState,
        [`carousel1`]: carouselNumber !== 1,
        [`carousel2`]: carouselNumber !== 2,
        [`carousel3`]: carouselNumber !== 3,
        [`carousel4`]: carouselNumber !== 4,
      }));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      { isReadyModalVisible ? <View style={styles.overlay}/> : true }
      <Modal
        animationType='none'
        transparent={true}
        visible={isReadyModalVisible}
        onRequestClose={() => setIsReadyModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => handleReadyResponse(false)} style={{position: 'absolute', alignSelf: 'flex-end', padding: 15, opacity: 0.3}}>
                <Ionicons name="close" size={35} color={colors.off_white} />
            </TouchableOpacity>

            <Text style={[styles.modalText, {marginTop: 20}]}>You are feeling:</Text>
            <Text style={[styles.modalTextEmotion, {color: item.color}]}>{item.text}</Text>
            <Text style={styles.modalText}>Are you ready to chat?</Text>
              <TouchableOpacity onPress={() => handleReadyResponse(false)}>
                <Ionicons name="checkmark-circle" size={50} color={colors.off_white} />
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.barContainer}>
        <TouchableOpacity style={styles.settingsButtonContainer} onPress={() => {/* Handle navigation */}}>
          <Ionicons name="menu" size={40} color={colors.off_white} />
        </TouchableOpacity>
        <View style={styles.startChatTextContainer}>
          <Text style={isItemSelected ? styles.startChatTextEnabled : styles.startChatTextDisabled}>Chat with someone</Text>
        </View>
        <TouchableOpacity 
          style={styles.startChatButtonContainer} 
          disabled={!isItemSelected} 
          onPress={() => setIsReadyModalVisible(true)}
        >
          <Ionicons name="arrow-forward-circle" size={50} color={isItemSelected ? colors.off_white : colors.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainCarouselContainer}>
        {[high_positive_data, low_positive_data, low_negative_data, high_negative_data].map((data, index) => (
          <View key={index} style={styles.carouselContainer}>
            <CircularCarousel
              data={data}
              isActive={activeCarousel === index + 1 || activeCarousel === 'all'}
              onScrollBegin={() => handleCarouselScrollBegin(index + 1)}
              resetScroll={resetScroll[`carousel${index + 1}`]}
              onSelectedItemChange={(item) => handleSelectedItemChange(item, index + 1)}
              isInverted={true}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black', // or any other color
    zIndex: 1, // Ensure it's below the modal
    opacity: 0.6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    width: 300,
    backgroundColor: '#212121',
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#212121',
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 5,
    zIndex: 2,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
  },
  modalTextEmotion: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    ustifyContent: 'space-between'
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
  settingsButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 8,
    // backgroundColor: 'red',
  },
  startChatButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  startChatTextContainer: {
  },
  startChatTextEnabled: {
    color: colors.off_white,
    fontSize: 18,
    fontWeight: '500'
  },
  startChatTextDisabled: {
    color: colors.off_white,
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.5,
  },
  mainCarouselContainer: {
    flex: 1,  // Take up all available space
    justifyContent: 'center', // Center carousels vertically
    marginVertical: 40,
  },
  carouselContainer: {
    marginVertical: '2%',
  }
});

export default EmotionsScreen;
