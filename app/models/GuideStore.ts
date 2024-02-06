import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { GuideImageModel } from "./GuideImage"
import { GuideMapPathModel } from "./GuideMapPath"
import { GuidePageModel } from "./GuidePage"

/**
 * Model description here for TypeScript hints.
 */
export const GuideStoreModel = types
  .model("GuideStore")
  .props({
    pages: types.array(GuidePageModel),
    images: types.array(GuideImageModel),
    mapPaths: types.array(GuideMapPathModel),
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
      console.log(" --- inside getGuidePage model store ---")
      console.log("getGuidePage", path)
      console.log("self.pages", self.pages.toJSON())
      const page = self.pages.find(page => page.path === path.toString())
      console.log("page", page)
      if (page) {
        return page
      } else {
        return {
          path: path,
          html: `<h1>${path} Not Found!</h1>`,
          meta: []
        }
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchGuide() {
      store.setProp("loading", true)
      // const response = await api.getEpisodes()
      // if (response.kind === "ok") {
      //   store.setProp("episodes", response.episodes)
      // } else {
      //   console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      // }
      store.setProp("pages", guide.guidePages)
      store.setProp("images", guide.guideImages)
      store.setProp("mapPaths", guide.guideMapPaths)

      store.setProp("loading", false)
      console.log("hallo loaded guide")
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideStore extends Instance<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotOut extends SnapshotOut<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotIn extends SnapshotIn<typeof GuideStoreModel> { }
export const createGuideStoreDefaultModel = () => types.optional(GuideStoreModel, {})


const guide = {
  "guidePages": [
    {
      "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/guide1.md",
      "path": "guide1.md",
      "html": "<p>Hello World 2 !</p>\n<button path=\"home.md\">Back to Home!</button>",
      "meta": []
    },
    {
      "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/home.md",
      "path": "home.md",
      "html": "<h1>Hello World!</h1>\n<button path=\"guide1.md\">To Guide 1!</button>",
      "meta": []
    }
  ],
  "guideImages": [],
  "guideMapPaths": []
}