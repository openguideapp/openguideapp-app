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
    html: "",
    meta: types.optional(types.frozen(), {}),
    // meta: types.optional(types.array(types.frozen()), []),
    // meta: types.map(types.map(types.string)), // TODO: this should be a map of string to string
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get isMetaSet() {
      return self.meta.length > 0;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuidePage extends Instance<typeof GuidePageModel> { }
export interface GuidePageSnapshotOut extends SnapshotOut<typeof GuidePageModel> { }
export interface GuidePageSnapshotIn extends SnapshotIn<typeof GuidePageModel> { }
export const createGuidePageDefaultModel = () => types.optional(GuidePageModel, {})