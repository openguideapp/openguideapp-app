import * as React from "react"
import { Button, StyleProp, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { RenderHTMLSource } from "react-native-render-html"

export interface RendererProps {
  /**
   * An optional style override useful for padding & margin.
   */
  // style?: StyleProp<ViewStyle>
  htmlSource: string
}

/**
 * Describe your component here
 */
export const Renderer = observer(function Renderer(props: RendererProps) {
  const { style } = props
  const $styles = [$container, style]

  const { width } = useWindowDimensions()

  const { htmlSource } = props
  const source = { html: htmlSource }

  return <RenderHTMLSource contentWidth={width} source={source} />
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}