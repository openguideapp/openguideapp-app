import * as React from "react"
import { Button, StyleProp, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import RenderHTML, {
  HTMLElementModel,
  HTMLContentModel,
  defaultHTMLElementModels,
} from "react-native-render-html"

export interface RendererProps {
  /**
   * An optional style override useful for padding & margin.
   */
  // style?: StyleProp<ViewStyle>
  htmlSource: string
}

import { useNavigation } from "@react-navigation/native"

/**
 * Describe your component here
 */
export const Renderer = observer(function Renderer(props: RendererProps) {
  const { style } = props
  const $styles = [$container, style]

  const { width } = useWindowDimensions()

  const { htmlSource } = props
  const source = { html: htmlSource }

  return (
    <RenderHTML
      contentWidth={width}
      source={source}
      customHTMLElementModels={customHTMLElementModels}
      renderers={renderers}
    />
  )
})

const CustomButton = ({ path, title }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    // TODO: which screen?
    // navigation.navigate("GuideTabNavigator", { screen: "GuidePageStackNavigator", params: {screen:"GuidePage", params: {path: "test"} })

    navigation.push("GuideTabNavigator", {
      screen: "GuidePageStackNavigator",
      params: {
        screen: "GuidePage",
        path: "hallo",
        params: {
          path: { path },
        },
      },
    })

    // navigation.navigate("GuideTabNavigator", params:
    //     { screen: "GuidePageStackNavigator", params: { screen: "GuidePageStackNavigator", path: { path } }
    // )
  }

  return <Button title="Button Title" onPress={handlePress} />
}

const customHTMLElementModels = {
  button: HTMLElementModel.fromCustomModel({
    tagName: "button",
    contentModel: HTMLContentModel.block,
  }),
}

const renderers = {
  button: ({ tnode }: any) => {
    const { path, title } = tnode.attributes
    return <CustomButton path={path} title={title} />
  },
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
