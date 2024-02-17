import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import FastImage from "react-native-fast-image"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen(_props) {
  const { navigation } = _props

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  function goNext() {
    // navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
    // navigation.navigate("GuideTabNavigator", { screen: "GuideHome" })
    navigation.replace("GuideTabNavigator", { screen: "GuidePage" })
  }

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
      <FastImage
        source={{ uri: "https://unsplash.it/400/400?image=1" }}
        style={{ width: "100%", height: 200, resizeMode: "stretch" }}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
