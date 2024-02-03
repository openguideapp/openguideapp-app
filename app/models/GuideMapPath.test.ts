import { GuideMapPathModel } from "./GuideMapPath"

test("can be created", () => {
  const instance = GuideMapPathModel.create({})

  expect(instance).toBeTruthy()
})
