import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
// import { Vimeo } from "react-native-vimeo-iframe"
import { AudioPlayer, Button, Screen, Text, VideoPlayer } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

const track1 = {
  url: "https://github.com/openguideapp/openguideapp-test-guide/raw/main/media/audio/podcast.mp3", // Load media from the network
  title: "Avaritia",
  artist: "deadmau5",
  album: "while(1<2)",
  genre: "Progressive House, Electro House",
  date: "2014-05-20T07:00:00+00:00", // RFC 3339
  artwork:
    "https://images.pexels.com/photos/2406875/pexels-photo-2406875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Load artwork from the network
  duration: 402, // Duration in seconds
}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen(_props) {
  const { navigation } = _props

  const { userSettings, guideStore } = useStores()

  function goNext() {
    // navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
    // navigation.navigate("GuideTabNavigator", { screen: "GuideHome" })
    navigation.replace("GuideTabNavigator", { screen: "GuidePage" })
  }
  // userSettings.setProp("lng", "de")

  // console.log(navigation.getState())

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="settings" />
      <Button
        testID="next-screen-button"
        preset="reversed"
        tx="welcomeScreen.letsGo"
        onPress={goNext}
      />
      <Button
        testID="next-screen-button"
        preset="reversed"
        tx="welcomeScreen.letsGo"
        onPress={() => navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })}
      />
      <Button
        testID="next-screen-button"
        preset="reversed"
        // tx="welcomeScreen.letsGo"
        text="Set Lng to de"
        onPress={() => {
          userSettings.setProp("lng", "de")
          guideStore.fetchGuide("de")
        }}
      />
      <Button
        testID="next-screen-button"
        preset="reversed"
        // tx="welcomeScreen.letsGo"
        text="Set Lng to en"
        onPress={() => {
          userSettings.setProp("lng", "en")
          guideStore.fetchGuide("en")
        }}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
