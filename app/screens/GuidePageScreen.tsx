import React, { FC, useEffect, useState } from "react"
import { useWindowDimensions, ViewStyle } from "react-native"
import { RenderHTMLSource } from "react-native-render-html"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { GuideRenderEngine } from "app/renderer/GuideRenderEngine"
import { observer } from "mobx-react-lite"

export interface GuidePageScreenProps extends AppStackScreenProps<"GuidePage"> {}

export const GuidePageScreen: FC<GuidePageScreenProps> = observer(function GuidePageScreen(props) {
  const { guideStore, userSettings } = useStores()
  const { navigation } = props
  const { path } = props?.route?.params

  const [currentLanguage, setCurrentLanguage] = useState("")
  const [currentPath, setCurrentPath] = useState(path)

  useEffect(() => {
    if (currentLanguage !== userSettings.lng) {
      // TODO: This should happen in the store
      // TODO: also fallback home.md if path is not found
      // TODO: more error management
      const paths: string[] = currentPath.split("/")
      const newPath: string = paths
        .map((segment: string, index: number): string => (index === 1 ? userSettings.lng : segment))
        .join("/")
      setCurrentPath(newPath) // Update the path
      setCurrentLanguage(userSettings.lng) // Update the language
    }
  }, [userSettings.lng]) // Only re-run the effect if `userSettings.lng` changes

  const page = guideStore.getGuidePage(currentPath) // Use `currentPath` which reflects the latest language setting
  const { width } = useWindowDimensions()

  return (
    <Screen style={$root} preset="scroll">
      <Text text="guidePage" />
      <GuideRenderEngine>
        <RenderHTMLSource contentWidth={width} source={{ html: page.html }} />
      </GuideRenderEngine>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
