import { githubApi, type GithubEntry } from "./api/githubApi";
import markdownToHast from "./markdown/markdown-to-hast";
import type { GuidePage } from "./types/data-types";

// Implement the guidePageBuilder function
async function guidePageBuilder(entries: GithubEntry[]): Promise<GuidePage[]> {
    const pages: GuidePage[] = [];

    for (const entry of entries) {
        try {
            const mdSource = await githubApi.downloadString(entry.uri);
            const file = await markdownToHast(mdSource);
            const guidePage: GuidePage = {
                downloadUrl: entry.uri,
                path: entry.path,
                html: file.value.toString(),
                meta: { ...file.data },
            };

            pages.push(guidePage);
        } catch (error) {
            console.error(`Failed to process URL ${entry.uri}:`, error);
            // Handle error, possibly by continuing to the next URL
        }
    }

    return pages;
}

export default guidePageBuilder