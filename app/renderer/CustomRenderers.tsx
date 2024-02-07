import { Button } from "react-native"
import { log } from "app/services/logging/logger"
import { TNode } from "react-native-render-html"
import { GuidePageStackNavigatorParamList } from "app/navigators"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

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
}
