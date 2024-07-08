import guideListingBuilder from "../builders/guideListingBuilder";
import { GithubEntry } from "../api/githubApi";

test("guide listing builder processes TOML entries", async () => {
  const entries: GithubEntry[] = [{ uri: "https://github.com/openguideapp/openguideapp-test-guide", path: "sample.toml" }];
  const listings = await guideListingBuilder(entries);
  expect(listings.length).toBeGreaterThan(0);
  expect(listings[0].title).toBeDefined();
});
