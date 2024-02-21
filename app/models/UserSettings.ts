import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const UserSettingsModel = types
  .model("UserSettings")
  .props({
    lng: "en", // TODO: this should be init by i18n
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async changeLanguage(lng: string) {
      self.setProp("lng", lng)
    }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserSettings extends Instance<typeof UserSettingsModel> { }
export interface UserSettingsSnapshotOut extends SnapshotOut<typeof UserSettingsModel> { }
export interface UserSettingsSnapshotIn extends SnapshotIn<typeof UserSettingsModel> { }
export const createUserSettingsDefaultModel = () => types.optional(UserSettingsModel, {})
