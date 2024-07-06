import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { usePathname, router } from "expo-router";
import { searchPosts } from "@/lib/appwrite";

const SearchInput = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();

  console.log(pathname);

  const onSearch = () => {
    if (!query) {
      return Alert.alert(
        "Nothing to search",
        "Please input something to search"
      );
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="border-2 border-black-200 rounded-2xl h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        value={query}
        onChangeText={setQuery}
        className="text-white flex-1   text-base mt-0.5  font-pregular"
        placeholder={"Search for a video topic, min 3 letters"}
        placeholderTextColor="#cdcde0"
      />

      <TouchableOpacity onPress={onSearch}>
        <Image
          source={icons.search}
          className="w-5 h-5 "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
