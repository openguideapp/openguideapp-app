import { Button } from "react-native"
import { log } from "app/services/logging/logger"
import { TNode } from "react-native-render-html"
import { GuidePageStackNavigatorParamList } from "app/navigators"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import FastImage from "react-native-fast-image"
import { t } from "i18n-js"

const YourImage = () => (
  <FastImage
    style={{ width: 200, height: 200 }}
    source={{
      uri: "https://unsplash.it/400/400?image=1",
      headers: { Authorization: "someAuthToken" },
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
)

export const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
}

interface customRendererProps {
  tnode: TNode
}

export const customRenderers = {
  button: ({ tnode }: customRendererProps) => {
    const navigation = useNavigation<StackNavigationProp<GuidePageStackNavigatorParamList>>()
    const guidePath = tnode.attributes?.path
    const buttonTitle = tnode.init?.textNode?.data ?? "Default Title"

    const handlePress = () => {
      navigation.push("GuidePage", { path: guidePath })
    }

    return <Button title={buttonTitle} onPress={handlePress} />
  },
  img: ({ tnode }: customRendererProps) => {
    const imgSrc = tnode.attributes?.src

    console.log(tnode.attributes)

    return (
      <FastImage
        style={{ width: 200, height: 200 }}
        source={{
          uri: "https://unsplash.it/400/400?image=1",
          headers: { Authorization: "someAuthToken" },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    )
  },
}
