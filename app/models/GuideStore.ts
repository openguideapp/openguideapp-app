import guideBuilder from "app/guide-builder/src/builders/guideBuilder"
import { replaceStyleMappings } from "app/renderer/applyStyleMapping";
import { assertAllMappingsApplied } from "app/renderer/assertAllMappingsApplied";
import { mergeWithDefaultThemeStyles } from 'app/renderer/mergeWithDefaultThemeStyles';
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { GuideStyleDictionary } from './../guide-builder/src/types/data-types';
import { applyStyleMapping } from './../renderer/applyStyleMapping';
import { withSetPropAction } from "./helpers/withSetPropAction"
import { GuideImageModel } from "./GuideImage"
import { GuideMapPathModel } from "./GuideMapPath"
import { GuidePageModel } from "./GuidePage"
import { GuideStyle, GuideStyleModel } from './GuideStyle';

/**
 * Model description here for TypeScript hints.
 */
export const GuideStoreModel = types
  .model("GuideStore")
  .props({
    pages: types.array(GuidePageModel),
    images: types.array(GuideImageModel),
    mapPaths: types.array(GuideMapPathModel),


    styles: types.array(GuideStyleModel),
    tagStyles: types.frozen(GuideStyleDictionary),
    themeStyles: types.frozen(GuideStyleDictionary),



    loading: false,
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get guideHomePage() {
      const homePage = self.pages.find(page => page.path === "home.md")
      if (homePage) {
        return homePage
      } else {
        return {
          path: "home.md",
          html: "<h1>Home Page Not Found!</h1>",
          meta: []
        }
      }
    },
    getGuidePage(path: string) {
      const page = self.pages.find(page => page.path === path.toString())
      // console.log("page", page)
      if (page) {
        return page
      } else {
        return {
          path,
          html: `<h1>${path} Not Found!</h1>`,
          meta: []
        }
      }
    },
    getTagsStyles() {
      return self.styles.find((style) => style.path.endsWith("tags.styles.toml"))?.styles
    },
    getThemeStyles() {
      return self.styles.find((style) => style.path.endsWith("theme.styles.toml"))?.styles
    },
    getComponentStyles() {
      return self.styles.find((style) => style.path.endsWith("components.styles.toml"))?.styles
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchGuide(lng = "en") {
      store.setProp("loading", true)
      // const response = await api.getEpisodes()
      // if (response.kind === "ok") {
      //   store.setProp("episodes", response.episodes)
      // } else {
      //   console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      // }
      const guide = await guideBuilder("https://github.com/openguideapp/openguideapp-test-guide/tree/main")
      store.setProp("pages", guide.languages[lng].pages)
      store.setProp("images", guide.images)
      store.setProp("mapPaths", guide.mapPaths)
      store.setProp("styles", guide.styles)


      const mergedThemeStyles = mergeWithDefaultThemeStyles(
        guide.styles.find((style) => style.path.endsWith("theme.styles.toml"))?.styles || {}
      )
      const resolvedThemeStyles = mergedThemeStyles.colorsPalette ? applyStyleMapping(mergedThemeStyles, mergedThemeStyles.colorsPalette) : mergedThemeStyles







      assertAllMappingsApplied(resolvedThemeStyles)

      store.setProp("themeStyles", resolvedThemeStyles)
      store.setProp("loading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideStore extends Instance<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotOut extends SnapshotOut<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotIn extends SnapshotIn<typeof GuideStoreModel> { }
export const createGuideStoreDefaultModel = () => types.optional(GuideStoreModel, {})
