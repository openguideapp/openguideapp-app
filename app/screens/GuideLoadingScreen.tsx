import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"

interface GuideLoadingScreenProps extends AppStackScreenProps<"GuideLoading"> {}

export const GuideLoadingScreen: FC<GuideLoadingScreenProps> = observer(
  function GuideLoadingScreen() {
    // Pull in one of our MST stores
    const { guideStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll">
        <Text style={$loadingText} text="guideLoading" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $loadingText: TextStyle = {
  alignContent: "center",
}
