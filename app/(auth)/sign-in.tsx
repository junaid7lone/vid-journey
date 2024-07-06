import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      Alert.alert("Error:", "Please fill in all the fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await signIn({ email, password });
      if (user) {
        router.push("/");
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        {isSubmitting ? (
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
              Login in to aora
            </Text>
            <FormField
              title="Email"
              value={email}
              placeholer="Enter email"
              handleChangeText={setemail}
            />
            <FormField
              title="Password"
              placeholer="Enter password"
              value={password}
              handleChangeText={setpassword}
            />

            <CustomButton
              containerStyle="mt-6"
              handlePress={submit}
              isLoading={isSubmitting}
            >
              Sign In
            </CustomButton>

            <View className="justify-center pt-5 flex-row gap-2  ">
              <Text className="text-gray-100 text-lg font-pregular">
                Don't have an account ?
              </Text>
              <Link
                href={"/sign-up"}
                className="text-lg font-psemibold text-secondary"
              >
                Sign up
              </Link>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
