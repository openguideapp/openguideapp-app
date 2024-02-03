import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface GuideSearchScreenProps extends AppStackScreenProps<"GuideSearch"> {}

export const GuideSearchScreen: FC<GuideSearchScreenProps> = observer(function GuideSearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="guideSearch" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
