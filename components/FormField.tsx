import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type FormFieldProps = {
  title: string;
  value: string | "";
  placeholer?: string;
  handleChangeText: (value: React.ChangeEvent<HTMLInputElement>) => void;
  otherStyles?: string;
};

const FormField = ({
  title,
  value,
  placeholer,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 mt-6 ${otherStyles} `}>
      <Text className="text-base text-gray-100 font-pmedium ">{title}</Text>
      <View className="border-2 border-black-200 rounded-2xl h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row">
        <TextInput
          value={value}
          secureTextEntry={title === "Password" && !showPassword}
          onChangeText={handleChangeText}
          className="text-white flex-1 font-psemibold text-base"
          placeholder={placeholer}
          placeholderTextColor="#7b7b8b"
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
