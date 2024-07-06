import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const VideoCard = (props) => {
  const { creator, prompt, thumbnail, title, video, horizontal } = props;
  const [play, setplay] = useState(false);

  return (
    <View
      className={`  flex-col items-centerpx-4 mb-14 ${
        horizontal ? "ml-5 space-y-3" : ""
      }`}
    >
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5  ">
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1 ">
            <Text
              className="text-white text-sm font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 text-xs font-pregular"
              numberOfLines={1}
            >
              {creator.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5 "
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setplay(false)}
        >
          <Video
            source={{ uri: video }}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            shouldPlay
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
          className="w-full h-60 rounded-xl mt-3 justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setplay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12 "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
