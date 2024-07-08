import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createAccount } from "@/lib/appwrite";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";

type User = {
  email: string;
  password: string;
};

interface CreateUser extends User {
  username: string;
}

const SignUp = () => {
  const { setUser, setisLoggedIn } = useGlobalContext();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error:", "Please fill in all the fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = await createAccount({ username, email, password });
      setUser(newUser);
      setisLoggedIn(true);
      Alert.alert("Success", "You are now signed in");
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
              title="Username"
              value={username}
              placeholer="Enter username"
              handleChangeText={setusername}
            />
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
              Sign Up
            </CustomButton>

            <View className="justify-center pt-5 flex-row gap-2  ">
              <Text className="text-gray-100 text-lg font-pregular">
                Have an account already ?
              </Text>
              <Link
                href={"/sign-in"}
                className="text-lg font-psemibold text-secondary"
              >
                Sign In
              </Link>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
