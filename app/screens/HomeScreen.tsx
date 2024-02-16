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
      setIsLoading(false)

      navigation.replace("GuideTabNavigator", {
        screen: "GuidePageStackNavigator",
        params: {
          screen: "GuidePage",
          params: {
            path: "home.md",
          },
        },
      })
    }
    if (guideUrl !== "") {
      fetchGuide()
    }
  }, [guideUrl])

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
