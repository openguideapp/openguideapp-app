import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface MarketplaceScreenProps extends AppStackScreenProps<"Marketplace"> {}

export const MarketplaceScreen: FC<MarketplaceScreenProps> = observer(function MarketplaceScreen(
  _props,
) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { guideStore } = useStores()

  const { navigation } = _props

  const fetchGuide = async () => {
    setIsLoading(true)
    guideStore.fetchGuide()
    navigation.replace("GuideLoading")
  }

  // choose guide
  // download guide
  // load guide
  // navigate to GuideHomeScreen
  // render guide

  return (
    <Screen style={$root} preset="scroll">
      <Text text="marketplace" />

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
