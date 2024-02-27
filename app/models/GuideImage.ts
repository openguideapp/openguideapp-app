import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GuideImageModel = types
  .model("GuideImage")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideImage extends Instance<typeof GuideImageModel> {}
export interface GuideImageSnapshotOut extends SnapshotOut<typeof GuideImageModel> {}
export interface GuideImageSnapshotIn extends SnapshotIn<typeof GuideImageModel> {}
export const createGuideImageDefaultModel = () => types.optional(GuideImageModel, {})
