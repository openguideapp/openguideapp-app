import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Assuming GuideItem is a type that includes at least an id and title
type GuideItem = {
  id: string
  title: string
  path: string
}

type GuideListProps = {
  guides: GuideItem[]
}

const GuideList: React.FC<GuideListProps> = ({ guides }) => {
  const navigation = useNavigation()

  const renderItem = ({ item }: { item: GuideItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.push("GuidePage", { path: item.path })}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList data={guides} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  itemTitle: {
    fontSize: 16,
  },
})

export default GuideList
