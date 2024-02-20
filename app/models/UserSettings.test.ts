import { UserSettingsModel } from "./UserSettings"

test("can be created", () => {
  const instance = UserSettingsModel.create({})

  expect(instance).toBeTruthy()
})
