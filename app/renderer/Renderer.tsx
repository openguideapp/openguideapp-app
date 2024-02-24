import * as React from "react"
import { Button, StyleProp, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import {
  MixedStyleDeclaration,
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  TRenderEngineProvider,
} from "react-native-render-html"
import { Text } from "app/components/Text"
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
  const { styles, htmlSource } = props
  const { width } = useWindowDimensions()
  const source = { html: htmlSource }

  const stylesObject = styles[0]
  // Assuming `styles` is an object where keys are selectors (e.g., ".class", "#id", "tag")
  // and values are style objects.

  // TODO: OMPTIMIZE!!!! https://stackoverflow.com/questions/68966120/react-native-render-html-you-seem-to-update-the-x-prop-of-the-y-component-in-s
  // const idsStyles = React.useMemo(
  //   () =>
  //     Object.keys(stylesObject)
  //       .filter((key) => key.startsWith("#"))
  //       .reduce((acc, key) => ({ ...acc, [key.substring(1)]: stylesObject[key] }), {}),
  //   [stylesObject],
  // )

  // const classesStyles = React.useMemo(
  //   () =>
  //     Object.keys(stylesObject)
  //       .filter((key) => key.startsWith("."))
  //       .reduce((acc, key) => ({ ...acc, [key.substring(1)]: stylesObject[key] }), {}),
  //   [stylesObject],
  // )

  // const tagsStyles = React.useMemo(
  //   () =>
  //     Object.keys(stylesObject)
  //       .filter((key) => !key.startsWith(".") && !key.startsWith("#"))
  //       .reduce((acc, key) => ({ ...acc, [key]: stylesObject[key] }), {}),
  //   [stylesObject],
  // )

  const tagsStyles = styles[0].style

  return (
    // <TRenderEngineProvider
    //   customHTMLElementModels={customHTMLElementModels}
    //   idsStyles={idsStyles}
    //   classesStyles={classesStyles}
    // tagsStyles={tagsStyles}
    // >
    //   <RenderHTMLConfigProvider renderers={customRenderers} renderersProps={{}}>
    <MemoHTMLRenderConfigProviderProps
      // idsStyles={idsStyles}
      // classesStyles={classesStyles}
      tagsStyles={tagsStyles}
    >
      <RenderHTMLSource contentWidth={width} source={source} />
    </MemoHTMLRenderConfigProviderProps>
    //   </RenderHTMLConfigProvider>
    // </TRenderEngineProvider>
  )
})
