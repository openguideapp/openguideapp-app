import guideImageBuilder from "../builders/guideImageBuilder";
import { GithubEntry } from "../api/githubApi";

test("guide image builder processes image entries", async () => {
  const entries: GithubEntry[] = [{ uri: "https://github.com/openguideapp/openguideapp-test-guide/sample.jpg", path: "sample.jpg" }];
  const images = await guideImageBuilder(entries);
  expect(images.length).toBeGreaterThan(0);
  expect(images[0].path).toBe("sample.jpg");
});
