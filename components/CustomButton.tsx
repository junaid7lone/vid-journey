import { Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type CustomButtonProps = {
  containerStyle: string;
  handlePress: () => void;
  children: ReactNode;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  containerStyle,
  handlePress,
  children,
  isLoading,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`min-h-[62px] bg-secondary rounded-xl justify-center items-center px-7  ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      } `}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
