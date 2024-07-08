import guideStyleBuilder from "../builders/guideStyleBuilder";
import { GithubEntry } from "../api/githubApi";

test("guide style builder processes CSS entries", async () => {
  const entries: GithubEntry[] = [{ uri: "https://github.com/openguideapp/openguideapp-test-guide/sample.css", path: "sample.css" }];
  const styles = await guideStyleBuilder(entries);
  expect(styles.length).toBeGreaterThan(0);
  expect(styles[0].path).toBe("sample.css");
});
