import { StyleSheet } from "react-native";
import React from "react";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { User } from "@/types";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export type UserRowProps = {
  data: User;
};

export function UserRow({ data }: UserRowProps) {
  const displayName = `${data.title}.${data.first_name} ${data.last_name}`;
  const fullAddress = `${data.address.city} ${data.address.country} ${data.address.street_address} ${data.address.street_name}`;

  return (
    <ThemedView style={[styles.container, styles.shadowProp]}>
      <ThemedView style={styles.row}>
        <Image
          source={data.avatar}
          contentFit="cover"
          transition={1000}
          style={{ width: 70, height: 70 }}
        />
        <ThemedView style={styles.content}>
          <ThemedView style={styles.rowBetween}>
            <ThemedText style={styles.fullName}>{displayName}</ThemedText>
            <ThemedView
              style={[
                styles.circle,
                data.is_active ? styles.active : styles.inactive,
              ]}
            />
          </ThemedView>
          <ThemedText style={styles.address}>{fullAddress}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inactive: {
    backgroundColor: "gray",
  },
  active: {
    backgroundColor: "green",
  },
  fullName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  address: {
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
