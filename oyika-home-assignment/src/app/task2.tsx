import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Modal from "react-native-modal";
import { Note } from "@/models/Note";

import { ThemeButton } from "@/components/ThemedButton";
import getRealm from "@/database/RealmConfig";
import { NoteRow } from "@/components/NoteRow";
import { UpdateMode } from "realm";

export default function Task2Screen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [notes, setListNote] = useState<any>([]);
  const [selectingNote, setSelectingNote] = useState<Note>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowingAddNotePopup, setIsShowingAddNotePopup] =
    useState<boolean>(false);

  const syncData = async () => {
    const realm = await getRealm();
    realm?.subscriptions.update((subs) => {
      const dogs = realm.objects(Note);
      subs.add(dogs);
    });
  };

  const fetchNotes = () => {
    setIsLoading(true);
    getRealm()
      .then((realm) => {
        console.log("realm", realm);
        if (realm) {
          const noteList = realm.objects("Note");
          setListNote(noteList);
          console.log("noteList -> ", noteList);
          noteList.addListener(() => {
            setListNote([...noteList]);
          });
          return () => {
            const noteList = realm.objects("Book");
            noteList.removeAllListeners();
            realm.close();
          };
        }
      })
      .catch((error) => {
        console.log(error, "ERROR");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // syncData();
    fetchNotes();
  }, []);

  useEffect(() => {
    setTitle(selectingNote?.title ?? "");
    setDescription(selectingNote?.description ?? "");
  }, [selectingNote]);

  const onSubmit = async () => {
    if (title.length > 0 && description.length > 0) {
      setIsLoading(true);
      const isEditing = !!selectingNote;
      const realm = await getRealm();
      if (realm) {
        const newNote = {
          _id: !isEditing ? new Realm.BSON.ObjectId() : selectingNote?._id,
          ...Note.generate(title, description),
        };
        realm.write(() => {
          if (isEditing) {
            realm.create("Note", newNote, UpdateMode.Modified);
          } else {
            realm.create("Note", newNote);
          }
        });
        const notesListUpdated = realm.objects("Note");
        setListNote([...notesListUpdated]);
      }
      setTitle("");
      setDescription("");
      setIsLoading(false);
      setIsShowingAddNotePopup(false);
    }
  };

  const onSelectAddNote = () => {
    setIsShowingAddNotePopup(true);
  };

  const onClosePopup = () => {
    setSelectingNote(undefined);
    setIsShowingAddNotePopup(false);
  };

  const onSelectDelete = async (data: Note) => {
    try {
      const realm = await getRealm();
      if (realm) {
        const deleteNote = realm.objectForPrimaryKey("Note", data._id);
        realm.write(() => {
          if (deleteNote) {
            realm.delete(deleteNote);
          }
        });
        const results = realm.objects("Note");
        setListNote(results);
      }
    } catch (error) {}
  };

  const onSelectEdit = (data: Note) => {
    setSelectingNote(data);
    setIsShowingAddNotePopup(true);
  };

  const renderItem = ({ item }: { item: Note }) => (
    <NoteRow
      data={item}
      onSelectDelete={onSelectDelete}
      onSelectEdit={onSelectEdit}
    />
  );

  const keyExtractor = (item: Note) => `note-${item._id}`;

  const isEditing = !!selectingNote;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={onSelectAddNote}>
          <ThemedText>add notes</ThemedText>
        </Pressable>
        <FlatList
          keyExtractor={keyExtractor}
          data={notes}
          renderItem={renderItem}
        />
        <Modal isVisible={isShowingAddNotePopup} onBackdropPress={onClosePopup}>
          <ThemedView style={styles.popupContainer}>
            <ThemedView>
              <ThemedText>{isEditing ? "Edit note" : "Add note"}</ThemedText>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter note title"
              />
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter note description"
              />
              <ThemeButton
                title="Add"
                disabled={title?.length === 0 || description?.length === 0}
                isLoading={isLoading}
                onPress={onSubmit}
              />
            </ThemedView>
          </ThemedView>
        </Modal>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  safeArea: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginVertical: 5,
  },
  popupContainer: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 5,
  },
});
