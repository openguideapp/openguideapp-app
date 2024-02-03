import { GuideImageModel } from "./GuideImage"

test("can be created", () => {
  const instance = GuideImageModel.create({})

  expect(instance).toBeTruthy()
})
