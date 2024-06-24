// import TOML from "@iarna/toml";
import toml from "toml"

import { githubApi, GithubEntry } from "../api/githubApi";
import { GuideListing } from "../types/data-types";

// Implement the guidePageBuilder function
async function guideListingBuilder(entries: GithubEntry[]): Promise<GuideListing[]> {
    const guideListings: GuideListing[] = [];

    for (const entry of entries) {
        try {
            const tomlSource = await githubApi.downloadString(entry.uri);
            const parsedToml = toml.parse(tomlSource);

            const guideListing: GuideListing = {
                title: parsedToml.title,
                description: parsedToml.description,
                author: parsedToml.author,
                thumbnails: parsedToml.thumbnails,
                tags: parsedToml.tags,
                downloadUrl: entry.uri,
            }

            guideListings.push(guideListing);

        } catch (error) {
            console.error(`Failed to process URL ${entry.uri}:`, error);
            // Handle error, possibly by continuing to the next URL
        }
    }

    return guideListings;
}

export default guideListingBuilder