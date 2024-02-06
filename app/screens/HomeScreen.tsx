import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Modal, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Button } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { guideStore } = useStores()
  const [guideUrl, setGuideUrl] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const { navigation } = _props

  useEffect(() => {
    const fetchGuide = async () => {
      setGuideUrl("")
      setIsError
      setIsLoading(true)
      try {
        await guideStore.fetchGuide()
      } catch (error) {
        setIsError(true)
      }
      // navigation.replace("GuideTabNavigator", { screen: "GuidePage" })
      navigation.replace("GuidePage")

      setIsLoading(false)
    }
    if (guideUrl !== "") {
      fetchGuide()
    }
  }, [guideUrl])

  // choose guide
  // download guide
  // load guide
  // navigate to GuideHomeScreen
  // render guide

  return (
    <Screen style={$root} preset="scroll">
      <Modal visible={isLoading}>
        <ActivityIndicator size="large" />
      </Modal>

      <Text text="Home" />

      <Button
        testID="next-screen-button"
        preset="reversed"
        // tx="welcomeScreen.letsGo"
        text="Load Guide!"
        onPress={() => setGuideUrl("https://www.google.com")}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
