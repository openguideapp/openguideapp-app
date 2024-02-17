import { GuideListingModel } from "./GuideListing"

test("can be created", () => {
  const instance = GuideListingModel.create({})

  expect(instance).toBeTruthy()
})
