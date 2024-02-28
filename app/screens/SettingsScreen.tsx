import React, { FC } from "react"
import { ViewStyle } from "react-native"
// import { Vimeo } from "react-native-vimeo-iframe"
import { Button, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { GuideListRendererExample } from "app/renderer/custom-renderer/GuideListRenderer"
import { observer } from "mobx-react-lite"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

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
      {/* <GuideListRendererExample /> */}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
