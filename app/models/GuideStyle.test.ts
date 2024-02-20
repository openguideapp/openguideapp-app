import { GuideStyleModel } from "./GuideStyle"

test("can be created", () => {
  const instance = GuideStyleModel.create({})

  expect(instance).toBeTruthy()
})
