import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Note } from "@/models/Note";
import { CheckIcon, DeleteIcon, EditIcon } from "@/assets/icons";

export type NoteRowProps = {
  data: Note;
  onSelectEdit: (data: Note) => void;
  onSelectDelete: (data: Note) => void;
};

export function NoteRow({ data, onSelectEdit, onSelectDelete }: NoteRowProps) {
  return (
    <ThemedView style={[styles.container, styles.shadowProp]}>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.rowBetween}>
            <ThemedText style={styles.fullName}>{data.title}</ThemedText>
            <ThemedView style={styles.row}>
              <TouchableOpacity onPress={() => onSelectEdit(data)}>
                <EditIcon size={20} />
              </TouchableOpacity>
              <ThemedView style={styles.horizontalSpacing} />
              <TouchableOpacity onPress={() => onSelectDelete(data)}>
                <DeleteIcon size={20} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
          <ThemedText style={styles.address}>{data.description}</ThemedText>
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
  horizontalSpacing: {
    width: 10,
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
