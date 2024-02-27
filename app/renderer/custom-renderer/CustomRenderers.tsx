import React from "react"
import { Button } from "react-native"
import FastImage from "react-native-fast-image"
import { MixedStyleDeclaration, TNode } from "react-native-render-html"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AudioPlayer, VideoPlayer } from "app/components"
import { GuidePageStackNavigatorParamList } from "app/navigators"
import { log } from "app/services/logging/logger"

import GuideList from "./GuideList"

interface customRendererProps {
  tnode: TNode
  componentStyles: Record<string, MixedStyleDeclaration>
}

export const generateCustomRenderers = (componentStyles: Record<string, MixedStyleDeclaration>) => {
  // if (componentStyles) {
  const audioStyles: Record<string, MixedStyleDeclaration> = Object.keys(componentStyles)
    .filter((key) => key.startsWith("audio"))
    .reduce((acc, key) => {
      acc[key] = componentStyles[key]
      return acc
    }, {} as Record<string, MixedStyleDeclaration>)
  // }
  console.log("audioStyles", audioStyles)
  return {
    audio: ({ tnode }: customRendererProps) => {
      return <AudioPlayer uri={tnode.attributes.url} customStyles={componentStyles} />
    },
    video: ({ tnode }: customRendererProps) => {
      console.log("tnode", tnode.getNativeStyles())
      console.log("tnode", tnode.getReactNativeProps())
      console.log("tnode", tnode.getWebStyles())

      return <VideoPlayer uri={tnode.attributes.url} />
    },
    guideList: ({ tnode }: customRendererProps) => {
      // Assuming tnode.children contains the data for the guides
      // This is a simplified example and might need to be adjusted based on your data structure
      const guides = tnode.children.map((guideNode) => ({
        id: guideNode.attributes.id,
        title: guideNode.attributes.title,
        path: guideNode.attributes.path,
      }))

      return <GuideList guides={guides} />
    },
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
}
