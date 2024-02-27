import * as React from "react"
import { Button, StyleProp, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import {
  MixedStyleDeclaration,
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  TRenderEngineProvider,
} from "react-native-render-html"
import { Text } from "app/components/Text"
import { useStores } from "app/models"
import { colors, typography } from "app/theme"
import { observer } from "mobx-react-lite"

import { customRenderers, renderersProps } from "./custom-renderer/CustomRenderers"
import { customHTMLElementModels } from "./CustomHtmlElementModels"
import MemoHTMLRenderConfigProviderProps from "./MemoHTMLRenderConfigProvider"

export interface RendererProps {
  /**
   * An optional style override useful for padding & margin.
   */
  styles?: any
  htmlSource: string
  // baseStyle?: MixedStyleDeclaration
  // idsStyles?: Record<string, MixedStyleDeclaration>
  // classesStyles?: Record<string, MixedStyleDeclaration>
  // tagsStyles?: Record<string, MixedStyleDeclaration>
}

/**
 * Describe your component here
 */
export const Renderer = observer(function Renderer(props: RendererProps) {
  const { guideStore } = useStores()
  const { styles, htmlSource } = props
  const { width } = useWindowDimensions()
  const source = { html: htmlSource }

  const tagsStyles = guideStore.getTagsStyles()
  const componentStyles = guideStore.getComponentStyles()

  console.log("tagstyles", tagsStyles)

  return (
    <MemoHTMLRenderConfigProviderProps
      // idsStyles={idsStyles}
      // classesStyles={classesStyles}
      componentStyles={componentStyles}
      tagsStyles={tagsStyles}
    >
      <RenderHTMLSource contentWidth={width} source={source} />
    </MemoHTMLRenderConfigProviderProps>
  )
})
