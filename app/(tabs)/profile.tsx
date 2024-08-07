import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import InfoBox from "@/components/InfoBox";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const handleLogout = () => {
    signOut();
    setisLoggedIn(false);
    setUser(null);
    router.replace("/sign-in-");
  };

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard key={item.$id} {...item} pageType="profile" />
        )}
        ListHeaderComponent={() => {
          return (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={handleLogout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user.avatar }}
                  resizeMode="contain"
                  className="w-[90%] h-[90%] rounded-lg"
                />
              </View>
              <InfoBox
                title={user.username}
                containerStyle="mt-5"
                textStyle="text-lg"
              />

              <View className="mt-5 flex-row ">
                <InfoBox
                  title={posts.length || 0}
                  subtitle={"Posts"}
                  containerStyle="mr-10"
                  textStyle="text-xl"
                />
                <InfoBox
                  title="1.2k"
                  subtitle="Followers"
                  containerStyle="mr-10"
                  textStyle="text-xl"
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video found"
            subtitle="Try creating some posts"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
