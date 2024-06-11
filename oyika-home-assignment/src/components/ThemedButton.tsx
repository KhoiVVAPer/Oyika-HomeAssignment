import {
  ActivityIndicator,
  ButtonProps,
  Pressable,
  StyleSheet,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { isLoading } from "expo-font";

export type ThemeButtonProps = ViewProps &
  ButtonProps & {
    lightColor?: string;
    darkColor?: string;
    title?: string;
    isLoading?: boolean;
  };

export function ThemeButton({
  style,
  lightColor,
  darkColor,
  title,
  isLoading,
  ...otherProps
}: ThemeButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <Pressable
      style={[styles.container, { backgroundColor: "green" }, style]}
      {...otherProps}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ThemedText style={{ color: "white" }}>{title}</ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
});
