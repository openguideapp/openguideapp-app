import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { GuideImageModel } from "./GuideImage"
import { GuideMapPathModel } from "./GuideMapPath"
import { GuidePageModel } from "./GuidePage"
import { GuideStyle, GuideStyleModel } from './GuideStyle';
import guideBuilder from "app/guide-builder/src/builders/guideBuilder"

/**
 * Model description here for TypeScript hints.
 */
export const GuideStoreModel = types
  .model("GuideStore")
  .props({
    pages: types.array(GuidePageModel),
    images: types.array(GuideImageModel),
    mapPaths: types.array(GuideMapPathModel),
    // style: types.array(GuideStyleModel),
    styles: types.frozen({}),
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

      store.setProp("loading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideStore extends Instance<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotOut extends SnapshotOut<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotIn extends SnapshotIn<typeof GuideStoreModel> { }
export const createGuideStoreDefaultModel = () => types.optional(GuideStoreModel, {})
