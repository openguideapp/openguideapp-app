import { blurhashFromURL } from 'blurhash-from-url';

import { GithubEntry } from "../api/githubApi";

import { GuideImage } from './../types/data-types';

async function guideImageBuilder(entries: GithubEntry[]): Promise<GuideImage[]> {
    const images: GuideImage[] = [];

    for (const entry of entries) {
        try {
            const output = await blurhashFromURL(entry.uri);
            const guideImage: GuideImage = {
                downloadUrl: entry.uri,
                path: entry.path,
                width: output.width,
                height: output.height,
                blurHash: output.encoded,
            }

            images.push(guideImage);
        } catch (error) {
            console.error(`Failed to process URL ${entry.uri}:`, error);
        }
    }

    return images;
}

export default guideImageBuilder