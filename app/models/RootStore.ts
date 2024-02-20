import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { AuthenticationStoreModel } from "./AuthenticationStore"
import { EpisodeStoreModel } from "./EpisodeStore"
import { GuideListingStoreModel } from "./GuideListingStore"
import { GuideStoreModel } from "./GuideStore"
import { UserSettingsModel } from "./UserSettings"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  guideListingStore: types.optional(GuideListingStoreModel, {} as any),
  guideStore: types.optional(GuideStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  userSettings: types.optional(UserSettingsModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
