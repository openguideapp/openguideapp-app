import { type Instance, type SnapshotIn, type SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GuideStyleModel = types
  .model("GuideStyle")
  .props({
    path: "",
    downloadUrl: "",
    styles: types.frozen<{ [key: string]: { [key: string]: string } }>(),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideStyle extends Instance<typeof GuideStyleModel> { }
export interface GuideStyleSnapshotOut extends SnapshotOut<typeof GuideStyleModel> { }
export interface GuideStyleSnapshotIn extends SnapshotIn<typeof GuideStyleModel> { }
export const createGuideStyleDefaultModel = () => types.optional(GuideStyleModel, {})
