import { githubApi, GithubEntry } from "../api/githubApi";
import { GuideMapPath } from '../types/data-types';

async function guideMapPathBuilder(entries: GithubEntry[]): Promise<GuideMapPath[]> {
    const paths: GuideMapPath[] = [];

    for (const entry of entries) {
        try {
            const coordinates = await githubApi.downloadPath(entry.uri);
            const guidePath: GuideMapPath = {
                downloadUrl: entry.uri,
                path: entry.path,
                coordinates,
            }

            paths.push(guidePath);
        } catch (error) {
            console.error(`Failed to process URL ${entry.uri}:`, error);
        }
    }

    return paths;
}

export default guideMapPathBuilder