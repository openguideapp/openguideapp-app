import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { AutoImage } from "app/components"
import type { GuideStylesDictionary } from "app/services/guide-builder/types/data-types"
import { useStores } from "app/models"
import type { GuidePageStackNavigatorParamList } from "app/navigators"

export interface GuideListRendererProps {
  path: string
  customStyles?: GuideStylesDictionary
}

interface GuideListItem {
  key: string
  iconUrl: string
  title: string
  description: string
  path: string
}

const GuideListRenderer = ({ path, customStyles }: GuideListRendererProps) => {
  const navigation = useNavigation<StackNavigationProp<GuidePageStackNavigatorParamList>>()
  console.log("hier")
  const { guideStore } = useStores()

  const pages = guideStore.getGuidePageDirectory(path)
  const items: GuideListItem[] = pages.map((page) => ({
    key: page.meta.id || page.path,
    title: page.meta.title || "No Title", // Assuming meta contains a title
    description: page.meta.description || "No Description", // Assuming meta contains a description
    iconUrl: page.meta.iconUrl,
    path: page.path,
  }))
  console.log(items)

  const onPress = (guidePath: string) => {
    navigation.push("GuidePage", { path: guidePath })

    // navigation.replace("GuideTabNavigator", {
    //   screen: "GuidePageStackNavigator",
    //   params: {
    //     screen: "GuidePage",
    //     params: {
    //       // TODO: Check if this part exists!
    //       path: `content/${lng}/home.md`,
    //     },
    //   },
    // })
  }

  return (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        // TODO: Change to touchable!
        <TouchableOpacity key={index} onPress={() => onPress(item.path)} activeOpacity={1}>
          <View style={styles.itemContainer}>
            {/* <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            // resizeMode={FastImage.resizeMode.center}
          /> */}
            <View style={styles.imageContainer}>
              <AutoImage
                source={{ uri: item.iconUrl }}
                style={styles.image}
                // resizeMode={FastImage.resizeMode.center}
              />
            </View>

            <View key={index} style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    color: "gray",
    fontSize: 14, // Adjust the size as needed
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Cover, contain, stretch, etc.
    marginBottom: 10, // Space between image and text
    // borderRadius: 5,
  },
  imageContainer: {
    height: 100,
    // overflow: "hidden",
    width: 100,
    borderRadius: 5,
  },
  itemContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd", // Color for the item separator
    paddingVertical: 10, // Space between items
    // paddingLeft: 20,
    flexDirection: "row",
    // backgroundColor: "red",
  },
  listContainer: {
    // Container style if needed
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  textContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd", // Color for the item separator
    // paddingVertical: 10, // Space between items
  },
  title: {
    fontWeight: "bold",
    fontSize: 16, // Adjust the size as needed
    marginBottom: 5, // Space between title and description
  },
})

const guideItems = [
  {
    imageUrl:
      "https://lh3.ggpht.com/zdpXpFdnUuSnpCKUELwGz0dVYyFSsT4VJO1O4APK7pq5QL7J9kB2RHR8lGVMclmr2ILS-Oh1HXsZPBYTSgFQuDNNRpNr=w500",
    title: "River Valley",
    description: "Description of item 1",
    path: "content/en/home.md",
  },
  {
    imageUrl:
      "https://lh3.ggpht.com/iULEgRZASrYpmHHA-ZO-gI4JzQrPrfufACRXrDkdjyxJcoau0aTy-Pk-Ha0IN191_tnCKh_7VTku-i5IXY550iheMg=w500",
    title: "View ov Amsterdam",
    description: "Description of item 1",
    path: "content/en/home.md",
  },
  {
    imageUrl:
      "https://lh6.ggpht.com/nhDrIG_lNLB2TtysjbK14BD-G5RCmBoZWjEBwkdYNpwZ5D-cDCM3eoOWrzcLcP4bg58B0k0z8e1irrFw-hJrKoTOI1E=w500",
    title: "Distant View a Road and Mossy",
    description: "Description of item 1",
    path: "content/en/home.md",
  },
  {
    imageUrl:
      "https://lh3.ggpht.com/sQlAGLswXH1v-xUAzB-L1Dsq3d3R9-Id_J9ehDA8jPOAXo4Do6V_EZJUo5nFUXnJynlTVgVDIEgSfQUazynDPq4ujLU=w500",
    title: "Item 1",
    description: "Mountain Valley with a Plateau",
    path: "content/en/home.md",
  },
]

// export const GuideListRendererExample = () => {
//   return <GuideListRenderer items={guideItems} />
// }

export default GuideListRenderer
