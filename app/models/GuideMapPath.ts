import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GuideMapPathModel = types
  .model("GuideMapPath")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideMapPath extends Instance<typeof GuideMapPathModel> {}
export interface GuideMapPathSnapshotOut extends SnapshotOut<typeof GuideMapPathModel> {}
export interface GuideMapPathSnapshotIn extends SnapshotIn<typeof GuideMapPathModel> {}
export const createGuideMapPathDefaultModel = () => types.optional(GuideMapPathModel, {})
