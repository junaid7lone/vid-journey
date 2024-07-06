import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import VideoCard from "./VideoCard";
import { getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import * as Animatable from "react-native-animatable";

import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
// import { Audio, Video } from "expo-av";

const zoomIn = { 0: { scale: 0.8 }, 1: { scale: 1 } };
const zoomOut = { 0: { scale: 1 }, 1: { scale: 0.8 } };

const Trending = () => {
  const [activeItem, setactiveItem] = useState(1);
  const { data: posts, loading } = useAppwrite(getLatestPosts);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setactiveItem(viewableItems[0].key);
    }
  };

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      renderItem={({ item }) => (
        <TrendingItem key={item.$id} activeItem={activeItem} item={item} />
      )}
    />
  );
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      // animation={"zoomInUp"}
      duration={500}
    >
      {play ? (
        <TouchableOpacity
          className="w-full  h-80 rounded-xl mt-3 justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setPlay(false)}
        >
          <Video
            source={{ uri: item.video }}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            shouldPlay
            // isLooping
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
            className="w-52 h-52 rounded-[35px] mt-3 bg-white/10"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="w-full  h-80 rounded-xl mt-3 justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-72 h-full rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/10 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12 "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default Trending;
