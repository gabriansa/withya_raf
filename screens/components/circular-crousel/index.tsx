import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CircularCarouselListItem, LIST_ITEM_WIDTH } from './list-item';

const windowDimensions = Dimensions.get('window');

type CarouselDataItem = {
  id: string;
  text: string;
  color: string;
};

type CircularCarouselProps = {
  data: CarouselDataItem[];
  isActive: boolean;
  onScrollBegin: () => void;
  resetScroll?: boolean;
  onSelectedItemChange: (item: CarouselDataItem) => void;
  isInverted?: boolean;
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({
  data, 
  isActive, 
  onScrollBegin, 
  resetScroll, 
  onSelectedItemChange,
  isInverted = false,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const contentOffset = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [scrollEndDragCalled, setScrollEndDragCalled] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const titleButtonData = data.find(item => item.id === "0");
  const carouselItems = data.filter(item => item.id !== "0");

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0.3, { duration: 300 });

    if (resetScroll && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [isActive, resetScroll]);

  const onScrollEndDrag = useCallback(() => {
    setScrollEndDragCalled(true);
  }, []);

  const onMomentumScrollEnd = useCallback((event) => {
    if (scrollEndDragCalled) {
      const index = Math.round(event.nativeEvent.contentOffset.x / LIST_ITEM_WIDTH);
      const selectedItem = carouselItems[index];
      if (selectedItem) {
        onSelectedItemChange(selectedItem);
      }
      setScrollEndDragCalled(false);
    }
  }, [carouselItems, onSelectedItemChange, scrollEndDragCalled]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const renderButton = () => (
    <TouchableOpacity
      onPress={() => setIsCarouselVisible(true)}
      style={{
        height: LIST_ITEM_WIDTH,
        aspectRatio: 1,
        borderRadius: LIST_ITEM_WIDTH / 2,
        backgroundColor: titleButtonData?.color ?? 'defaultColor',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: isActive ? 1 : 0.5
      }}
    >
      <Text style={{
        fontSize: windowDimensions.height * 0.02,
        textAlign: 'center',
        fontWeight: '300',
        color: 'black'
      }}>
        {titleButtonData?.text}
      </Text>
    </TouchableOpacity>
  );

  const handlePress = useCallback((index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * LIST_ITEM_WIDTH,
      animated: true,
    });

    const selectedItem = carouselItems[index];
    if (selectedItem) {
      onSelectedItemChange(selectedItem); // Make sure this passes the correct item data
    }
  }, [carouselItems, onSelectedItemChange]);

  const renderCarousel = () => (
    <Animated.FlatList
      style={animatedStyle}
      inverted={isInverted}
      ref={flatListRef}
      data={carouselItems}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16}
      onScroll={event => { contentOffset.value = event.nativeEvent.contentOffset.x }}
      onScrollBeginDrag={onScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      pagingEnabled
      snapToInterval={LIST_ITEM_WIDTH}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowDimensions.width / 2 - LIST_ITEM_WIDTH / 2,
      }}
      horizontal
      decelerationRate={0}
      renderItem={({ item, index }) => (
        <CircularCarouselListItem
          contentOffset={contentOffset}
          itemData={item}
          index={index}
          isActive={isActive}
          onPress={handlePress}
        />
      )}
    />
  );

  return (
    <Animated.View>
      {isCarouselVisible ? renderCarousel() : renderButton()}
    </Animated.View>
  );
};

export { CircularCarousel };
