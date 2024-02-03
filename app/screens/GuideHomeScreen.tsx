import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface GuideHomeScreenProps extends AppStackScreenProps<"GuideHome"> {}

export const GuideHomeScreen: FC<GuideHomeScreenProps> = observer(function GuideHomeScreen(_props) {
  const { navigation } = _props

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  function goNext() {
    // navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
    navigation.replace("TabDefaultNavigator", { screen: "Settings" })
  }

  console.log(navigation.getState())

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="guideHome" />
      <Button
        testID="next-screen-button"
        preset="reversed"
        tx="welcomeScreen.letsGo"
        onPress={goNext}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
