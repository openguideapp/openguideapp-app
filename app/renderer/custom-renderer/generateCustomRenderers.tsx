import React from "react"
import { Button } from "react-native"
import FastImage from "react-native-fast-image"
import { MixedStyleDeclaration, TNode } from "react-native-render-html"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { GuideStylesDictionary } from "app/services/guide-builder/src/types/data-types"
import { GuidePageStackNavigatorParamList } from "app/navigators"

import { AudioPlayerRenderer } from "./AudioPlayerRenderer"
import GuideListRenderer from "./GuideListRenderer"
import { VideoPlayerRenderer } from "./VideoPlayerRenderer"

interface customRendererProps {
  tnode: TNode
  componentStyles: GuideStylesDictionary
}

export const generateCustomRenderers = (componentStyles: GuideStylesDictionary) => {
  // const audioStyles: GuideStylesDictionary = Object.keys(componentStyles)
  //   .filter((key) => key.startsWith("audio"))
  //   .reduce((acc, key) => {
  //     acc[key] = componentStyles[key]
  //     return acc
  //   }, {} as GuideStylesDictionary)

  return {
    audio: ({ tnode }: customRendererProps) => {
      console.log("hallo")
      return <AudioPlayerRenderer uri={tnode.attributes.url} styles={componentStyles} />
    },
    video: ({ tnode }: customRendererProps) => {
      return <VideoPlayerRenderer uri={tnode.attributes.url} styles={componentStyles} />
    },
    list: ({ tnode }: customRendererProps) => {
      console.log("hallo")
      return <GuideListRenderer path={tnode.attributes.path} />
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
    //   img: ({ tnode }: customRendererProps) => {
    //     const imgSrc = tnode.attributes?.src

    //     console.log(tnode.attributes)

    //     return (
    //       <FastImage
    //         style={{ width: 200, height: 200 }}
    //         source={{
    //           uri: imgSrc,
    //           headers: { Authorization: "someAuthToken" },
    //           priority: FastImage.priority.normal,
    //         }}
    //         resizeMode={FastImage.resizeMode.contain}
    //       />
    //     )
    //   },
  }
}
