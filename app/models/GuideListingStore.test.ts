import { GuideListingStoreModel } from "./GuideListingStore"

test("can be created", () => {
  const instance = GuideListingStoreModel.create({})

  expect(instance).toBeTruthy()
})
