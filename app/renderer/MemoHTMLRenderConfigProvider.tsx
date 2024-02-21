import React, { ReactNode } from "react"
import {
  MixedStyleDeclaration,
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
} from "react-native-render-html"

import { customHTMLElementModels } from "./CustomHtmlElementModels"
import { customRenderers, renderersProps } from "./CustomRenderers"

interface MemoHTMLRenderConfigProviderProps {
  // baseStyle?: MixedStyleDeclaration
  idsStyles?: Record<string, MixedStyleDeclaration>
  classesStyles?: Record<string, MixedStyleDeclaration>
  tagsStyles?: Record<string, MixedStyleDeclaration>
  children: ReactNode
}

console.log(" ----    HTMLRenderConfigProviderProps rerender!   -----    ")

const MemoHTMLRenderConfigProvider: React.FC<MemoHTMLRenderConfigProviderProps> = React.memo(
  ({ idsStyles, classesStyles, tagsStyles, children }) => (
    <TRenderEngineProvider
      customHTMLElementModels={customHTMLElementModels}
      idsStyles={idsStyles}
      classesStyles={classesStyles}
      tagsStyles={tagsStyles}
    >
      <RenderHTMLConfigProvider renderers={customRenderers} renderersProps={renderersProps}>
        {children}
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  ),
)

// Set display name for the component
MemoHTMLRenderConfigProvider.displayName = "MemoHTMLRenderConfigProvider"

export default MemoHTMLRenderConfigProvider
