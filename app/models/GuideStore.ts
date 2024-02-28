import guideBuilder from "app/guide-builder/src/builders/guideBuilder"
import { applyStylesMapping } from "app/models/helpers/applyStylesMapping";
import { assertAllMappingsApplied } from "app/models/helpers/assertAllMappingsApplied";
import { mergeWithDefaultComponentStyles } from "app/models/helpers/mergeWithDefaultComponentStyles";
import { mergeWithDefaultTagsStyles } from "app/models/helpers/mergeWithDefaultTagsStyles";
import { mergeWithDefaultThemeStyles } from 'app/models/helpers/mergeWithDefaultThemeStyles';
import { generateCustomRenderers } from "app/renderer";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { GuideStylesCatalog, GuideStylesDictionary } from './../guide-builder/src/types/data-types';
import { mergeWithDefaultBaseStyles } from "./helpers/mergeWithDefaultBaseStyles";
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

    // styles: types.array(GuideStyleModel),
    tagsStyles: types.frozen<GuideStylesDictionary>(),
    themeStyles: types.frozen<GuideStylesDictionary>(),
    componentStyles: types.frozen<GuideStylesDictionary>(),
    customRenderer: types.frozen({}),
    baseStyles: types.frozen<GuideStylesDictionary>(),

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
      // store.setProp("pages", guide.languages[lng].pages)
      // store.setProp("images", guide.images)
      // store.setProp("mapPaths", guide.mapPaths)
      // store.setProp("styles", guide.styles)

      // 
      //    Theme Styles
      //
      const mergedThemeStyles = mergeWithDefaultThemeStyles(
        guide.styles.find((style) => style.path.endsWith("theme.styles.toml"))?.styles || {}
      )
      const resolvedThemeStyles = applyStylesMapping(mergedThemeStyles, mergedThemeStyles)
      assertAllMappingsApplied(resolvedThemeStyles)
      // store.setProp("themeStyles", resolvedThemeStyles)

      // 
      //    Base Styles
      //
      const mergedBaseStyles = mergeWithDefaultBaseStyles(
        guide.styles.find((style) => style.path.endsWith("base.styles.toml"))?.styles || {}
      )
      const resolvedBaseStyles = applyStylesMapping(mergedBaseStyles, resolvedThemeStyles)
      assertAllMappingsApplied(resolvedThemeStyles)
      console.log("resolvedBaseStyles", resolvedBaseStyles)
      // store.setProp("baseStyles", resolvedBaseStyles)

      // 
      //    Tags Styles
      //
      const mergedTagsStyles = mergeWithDefaultTagsStyles(
        guide.styles.find((style) => style.path.endsWith("tags.styles.toml"))?.styles || {}
      )
      const resolvedTagsStyles = applyStylesMapping(mergedTagsStyles, resolvedThemeStyles)
      assertAllMappingsApplied(resolvedThemeStyles)
      console.log("resolvedTagsStyles", resolvedTagsStyles)
      // store.setProp("tagsStyles", resolvedTagsStyles)

      // 
      //    Component Styles
      //
      const mergedComponentStyles = mergeWithDefaultComponentStyles(
        guide.styles.find((style) => style.path.endsWith("Component.styles.toml"))?.styles || {}
      )
      const resolvedComponentStyles = applyStylesMapping(mergedComponentStyles, resolvedThemeStyles)
      assertAllMappingsApplied(resolvedThemeStyles)
      console.log("resolvedComponentStyles", resolvedComponentStyles)
      store.setProp("componentStyles", resolvedComponentStyles)

      const customRenderer = generateCustomRenderers(resolvedComponentStyles)
      // store.setProp("customRenderer", customRenderer)

      store.setProp("pages", guide.languages[lng].pages)
      store.setProp("images", guide.images)
      store.setProp("mapPaths", guide.mapPaths)
      store.setProp("themeStyles", resolvedThemeStyles)
      store.setProp("baseStyles", resolvedBaseStyles)
      store.setProp("tagsStyles", resolvedTagsStyles)
      store.setProp("customRenderer", customRenderer)


      store.setProp("loading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideStore extends Instance<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotOut extends SnapshotOut<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotIn extends SnapshotIn<typeof GuideStoreModel> { }
export const createGuideStoreDefaultModel = () => types.optional(GuideStoreModel, {})
