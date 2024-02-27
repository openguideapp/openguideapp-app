import React, { ReactNode } from "react"
import {
  defaultSystemFonts,
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
  useAmbientTRenderEngine,
} from "react-native-render-html"
import { SpaceMono_400Regular, useFonts } from "@expo-google-fonts/space-mono"
import { GuideStylesDictionary } from "app/guide-builder/src/types/data-types"
import { useStores } from "app/models"

import { generateCustomRenderers } from "./custom-renderer/CustomRenderers"
import { customHTMLElementModels } from "./CustomHtmlElementModels"

interface GuideRenderEngineProps {
  children: ReactNode
}
const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
}

// function FontLoader({ children }) {
//   const [fontsLoaded] = useFonts({
//     "space-mono": SpaceMono_400Regular,
//   })
//   if (!fontsLoaded) {
//     return null
//   }
//   return <>{children}</>
// }

export const GuideRenderEngine: React.FC<GuideRenderEngineProps> = ({ children }) => {
  console.log("       ====        inside web engine         ===         ")
  const { guideStore } = useStores()

  const customRenderers = generateCustomRenderers(guideStore.componentStyles)

  const systemFonts = ["space-mono", ...defaultSystemFonts]

  return (
    // <FontLoader>
    <TRenderEngineProvider
      customHTMLElementModels={customHTMLElementModels}
      tagsStyles={guideStore.tagsStyles}
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
    // </FontLoader>customFontsToLoad
  )
}
