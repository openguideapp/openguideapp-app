import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface GuideMapScreenProps extends AppStackScreenProps<"GuideMap"> {}

export const GuideMapScreen: FC<GuideMapScreenProps> = observer(function GuideMapScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="guideMap" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
