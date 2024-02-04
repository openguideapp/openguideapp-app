import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GuidePageModel = types
  .model("GuidePage")
  .props({
    downloadUrl: "",
    path: "",
    data: "",
    meta: types.array(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuidePage extends Instance<typeof GuidePageModel> { }
export interface GuidePageSnapshotOut extends SnapshotOut<typeof GuidePageModel> { }
export interface GuidePageSnapshotIn extends SnapshotIn<typeof GuidePageModel> { }
export const createGuidePageDefaultModel = () => types.optional(GuidePageModel, {})
