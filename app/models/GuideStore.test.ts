import { GuideStoreModel } from "./GuideStore"

test("can be created", () => {
  const instance = GuideStoreModel.create({})

  expect(instance).toBeTruthy()
})
