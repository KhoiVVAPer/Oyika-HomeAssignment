import { StyleSheet, ActivityIndicator, FlatList } from "react-native";

import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/users";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "@/types";
import { UserRow } from "@/components/UserRow";

export default function Task1Screen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam = 1 }) => getUsers(pageParam),
      getNextPageParam: (lastPage) => lastPage.page + 1,
      initialPageParam: 0,
    });

  console.log("render", data);

  const users = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.pages.map((page) => page.data).flat();
  }, [data]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderSpinner = () => <ActivityIndicator />;

  const keyExtractor = (item: User) => `user-${item.id}`;

  const renderItem = ({ item }: { item: User }) => <UserRow data={item} />;

  const getItemHeight = (_: any, index: number) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.list}>
        <FlatList
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          getItemLayout={getItemHeight}
          windowSize={60}
          data={users}
          bounces={false}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={1.5}
          removeClippedSubviews={true}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  list: {
    flex: 1,
  },
});
