import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { createVideoPost } from "@/lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const { user } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [uploading, setUploading] = useState(false);

  const submit = async () => {
    if (!video || !title || !prompt || !thumbnail) {
      Alert.alert("Error", "Please fill all field");
    } else {
      setUploading(true);

      try {
        await createVideoPost({
          title,
          thumbnail,
          video,
          prompt,
          creator: user.$id,
        });

        Alert.alert("Success", "Post Uploaded Successfully");
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error);
      } finally {
        setTitle("");
        setPrompt("");
        setVideo(null);
        setThumbnail(null);
        setUploading(false);
      }
    }
  };

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setThumbnail(result.assets[0]);
      }
      if (selectType === "video") {
        setVideo(result.assets[0]);
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     setTitle("");
  //     setPrompt("");
  //     setVideo(null);
  //     setThumbnail(null);
  //   };
  // }, []);

  if (uploading) {
    return <ActivityIndicator size={"small"} />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-6 my-6">
        <View>
          <Text className=" text-2xl text-white  font-psemibold">
            Upload Video
          </Text>
          <FormField
            title="Video Title"
            value={title}
            placeholer="Enter Video Title"
            handleChangeText={setTitle}
            otherStyles=""
          />
        </View>
        <View className="mt-7 space-y-2">
          <View className="flex justify-between flex-row">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Video
            </Text>
            {video && (
              <TouchableOpacity onPress={() => openPicker("video")}>
                <Text className="text-small text-gray-100 font-pregular">
                  Replace Video
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {video ? (
            <Video
              source={{ uri: video.uri }}
              className="w-full h-64 rounded-2xl"
              resizeMode={ResizeMode.COVER}
              useNativeControls
            />
          ) : (
            <TouchableOpacity onPress={() => openPicker("video")}>
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14  border  border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2 "
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {thumbnail ? (
              <Image
                source={{ uri: thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5 "
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={prompt}
          placeholer="Enter Video Prompt"
          handleChangeText={setPrompt}
          otherStyles=""
        />

        <CustomButton
          containerStyle="mt-7"
          isLoading={uploading}
          handlePress={submit}
        >
          Submit & Publish
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
