import { GuidePageModel } from "./GuidePage"

test("can be created", () => {
  const instance = GuidePageModel.create({})

  expect(instance).toBeTruthy()
})
