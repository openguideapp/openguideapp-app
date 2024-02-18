import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GuideListingModel = types
  .model("GuideListing")
  .props({
    title: "",
    description: "",
    author: "",
    thumbnails: types.array(types.string),
    tags: types.array(types.string),
    downloadUrl: "",
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideListing extends Instance<typeof GuideListingModel> { }
export interface GuideListingSnapshotOut extends SnapshotOut<typeof GuideListingModel> { }
export interface GuideListingSnapshotIn extends SnapshotIn<typeof GuideListingModel> { }
export const createGuideListingDefaultModel = () => types.optional(GuideListingModel, {})
