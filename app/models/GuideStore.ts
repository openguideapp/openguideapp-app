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
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchGuide() {
      // const response = await api.getEpisodes()
      // if (response.kind === "ok") {
      //   store.setProp("episodes", response.episodes)
      // } else {
      //   console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      // }
      store.setProp("pages", guide.guidePages)
      store.setProp("images", guide.guideImages)
      store.setProp("mapPaths", guide.guideMapPaths)
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
      "hast": "<p>Hello World 2 !</p>\n<button path=\"home.md\">Back to Home!</button>",
      "meta": []
    },
    {
      "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/home.md",
      "path": "home.md",
      "hast": "<h1>Hello World!</h1>\n<button path=\"guide1.md\">To Guide 1!</button>",
      "meta": []
    }
  ],
  "guideImages": [],
  "guideMapPaths": []
}