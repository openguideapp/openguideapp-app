import React, { ReactNode } from "react"
import {
  defaultSystemFonts,
  MixedStyleDeclaration,
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
} from "react-native-render-html"
import { SpaceMono_400Regular, useFonts } from "@expo-google-fonts/space-mono"

import { generateCustomRenderers } from "./custom-renderer/CustomRenderers"
import { customHTMLElementModels } from "./CustomHtmlElementModels"

interface MemoHTMLRenderConfigProviderProps {
  // baseStyle?: MixedStyleDeclaration
  idsStyles?: Record<string, MixedStyleDeclaration>
  classesStyles?: Record<string, MixedStyleDeclaration>
  tagsStyles?: Record<string, MixedStyleDeclaration>
  componentStyles?: Record<string, MixedStyleDeclaration>

  children: ReactNode
}
export const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
}

function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    "space-mono": SpaceMono_400Regular,
  })
  if (!fontsLoaded) {
    return null
  }
  return <>{children}</>
}

console.log(" ----    HTMLRenderConfigProviderProps rerender!   -----    ")

const MemoHTMLRenderConfigProvider: React.FC<MemoHTMLRenderConfigProviderProps> =
  // React.memo(
  ({ idsStyles, classesStyles, tagsStyles, componentStyles, children }) => {
    const customRenderers = generateCustomRenderers(componentStyles)

    const systemFonts = ["space-mono", ...defaultSystemFonts]

    return (
      <FontLoader>
        <TRenderEngineProvider
          customHTMLElementModels={customHTMLElementModels}
          idsStyles={idsStyles}
          classesStyles={classesStyles}
          tagsStyles={tagsStyles}
          systemFonts={systemFonts}
        >
          <RenderHTMLConfigProvider
            renderers={customRenderers}
            renderersProps={renderersProps}
            enableExperimentalMarginCollapsing
            enableExperimentalBRCollapsing
            enableExperimentalGhostLinesPrevention
          >
            {children}
          </RenderHTMLConfigProvider>
        </TRenderEngineProvider>
      </FontLoader>
    )
  }
// )

// Set display name for the component
// MemoHTMLRenderConfigProvider.displayName = "MemoHTMLRenderConfigProvider"

export default MemoHTMLRenderConfigProvider
