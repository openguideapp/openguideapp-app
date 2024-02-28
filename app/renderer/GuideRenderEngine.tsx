import React, { ReactNode, useEffect, useMemo, useState } from "react"
import {
  defaultSystemFonts,
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
} from "react-native-render-html"
// import { SpaceMono_400Regular, useFonts } from "@expo-google-fonts/space-mono"
// import { GuideStylesDictionary } from "app/guide-builder/src/types/data-types"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

import { generateCustomRenderers } from "./custom-renderer/generateCustomRenderers"
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

export const GuideRenderEngine: React.FC<GuideRenderEngineProps> = observer(
  function GuideRenderEngine({ children }: GuideRenderEngineProps) {
    console.log("       ====        inside web engine         ===         ")

    const systemFonts = ["space-mono", ...defaultSystemFonts]
    const { guideStore } = useStores()

    return (
      // <FontLoader>
      <TRenderEngineProvider
        customHTMLElementModels={customHTMLElementModels}
        tagsStyles={guideStore.tagsStyles}
        baseStyle={guideStore.baseStyles.base}
        systemFonts={systemFonts}
      >
        <RenderHTMLConfigProvider
          renderers={guideStore.customRenderer}
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
  },
)
