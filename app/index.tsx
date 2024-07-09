import { Image, ScrollView, Text, View } from "react-native";
import { Slot, Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function HomeScreen() {
  const { isLoading, isLoggedIn, user } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 ">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200 ">Vid Journey</Text> !
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 right-[90px]"
              resizeMode="contain"
            />
          </View>

          <Text className="mt-7 text-gray-100 leading-6  text-sm text-center font-pregular">
            Where Creativity meets innocation : embasrk on a journey of
            limitless exploration with Vid Journey
          </Text>

          <CustomButton
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyle="w-full mt-7"
          >
            Continue with email
          </CustomButton>
        </View>
      </ScrollView>
      <StatusBar
        style="inverted"
        backgroundColor="#161622"
        translucent={true}
      />
    </SafeAreaView>
  );
}
