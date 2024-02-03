import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface GuidePageScreenProps extends AppStackScreenProps<"GuidePage"> {}

export const GuidePageScreen: FC<GuidePageScreenProps> = observer(function GuidePageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="guidePage" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
