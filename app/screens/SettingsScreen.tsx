import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import TrackPlayer from "react-native-track-player"
// import { Vimeo } from "react-native-vimeo-iframe"
import { AudioPlayer, Button, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

const videoCallbacks = {
  timeupdate: (data: any) => console.log("timeupdate: ", data),
  play: (data: any) => console.log("play: ", data),
  pause: (data: any) => console.log("pause: ", data),
  fullscreenchange: (data: any) => console.log("fullscreenchange: ", data),
  ended: (data: any) => console.log("ended: ", data),
  controlschange: (data: any) => console.log("controlschange: ", data),
}

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
  TrackPlayer.add([track1])
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
      <Button
        testID="next-screen-button"
        preset="reversed"
        // tx="welcomeScreen.letsGo"
        text="play!"
        onPress={() => {
          TrackPlayer.play()
        }}
      />
      <AudioPlayer track={track1} />

      {/* <View>
        <Vimeo videoId={"48728371"} params={"api=1&autoplay=0"} handlers={videoCallbacks} />
      </View> */}

      {/* <Text>hallo</Text> */}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
