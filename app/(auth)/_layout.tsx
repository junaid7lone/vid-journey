import React, { useEffect } from "react";
import { Tabs, Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar
        style="inverted"
        backgroundColor="#161622"
        translucent={true}
      />
    </>
  );
};

export default AuthLayout;
