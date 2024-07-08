import guideMapPathBuilder from "../builders/guideMapPathBuilder";
import { GithubEntry } from "../api/githubApi";

test("guide map path builder processes GPX entries", async () => {
  const entries: GithubEntry[] = [{ uri: "https://github.com/openguideapp/openguideapp-test-guide/sample.gpx", path: "sample.gpx" }];
  const paths = await guideMapPathBuilder(entries);
  expect(paths.length).toBeGreaterThan(0);
  expect(paths[0].path).toBe("sample.gpx");
});
