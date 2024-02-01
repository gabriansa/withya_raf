import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const windowDimensions = Dimensions.get('window');
export const LIST_ITEM_WIDTH = windowDimensions.height * 0.17;
const FONT_SIZE = windowDimensions.height * 0.0245;

type CarouselDataItem = {
  id: string;
  text: string;
  color: string;
};

type CircularCarouselListItemProps = {
  itemData: CarouselDataItem;
  index: number;
  contentOffset: Animated.SharedValue<number>;
  isActive: boolean;
  onPress: (index: number) => void;
};

const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
  itemData,
  index,
  contentOffset,
  isActive,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * LIST_ITEM_WIDTH,
      (index - 1) * LIST_ITEM_WIDTH,
      index * LIST_ITEM_WIDTH,
      (index + 1) * LIST_ITEM_WIDTH,
      (index + 2) * LIST_ITEM_WIDTH,
    ];
    const scale = interpolate(
      contentOffset.value,
      inputRange,
      isActive ? [0.8, 0.8, 1, 0.8, 0.8] : [0.8, 0.8, 0.8, 0.8, 0.8],
      Extrapolate.CLAMP
    );
    return {
      opacity: interpolate(
        contentOffset.value,
        inputRange,
        [0.7, 0.7, 1, 0.7, 0.7],
        Extrapolate.CLAMP
      ),
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity onPress={() => onPress(index)} activeOpacity={1}>
      <Animated.View style={animatedStyle}>
        <View style={[styles.item, { backgroundColor: itemData.color }]}>
          <Text style={styles.text}>{itemData.text}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: LIST_ITEM_WIDTH,
    aspectRatio: 1,
    borderRadius: LIST_ITEM_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT_SIZE,
    fontWeight: '300',
    color: 'black',
  },
});

export { CircularCarouselListItem };
