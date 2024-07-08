import guidePageBuilder from "../builders/guidePageBuilder";
import { GithubEntry } from "../api/githubApi";

test("guide page builder processes markdown entries", async () => {
  const entries: GithubEntry[] = [{ uri: "https://github.com/openguideapp/openguideapp-test-guide/sample.md", path: "sample.md" }];
  const pages = await guidePageBuilder(entries);
  expect(pages.length).toBeGreaterThan(0);
  expect(pages[0].path).toBe("sample.md");
});
