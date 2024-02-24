// Assuming these imports are correctly pointing to your actual modules
import { githubApi, GithubEntry } from "../api/githubApi";
import { GuideContent } from "../types/data-types";

// Import or define the FileInfo type and extractFileInfo function
import { extractFileInfo } from "./extractFileInfo";
// import guideImageBuilder from "./guideImageBuilder";
import guideListingBuilder from "./guideListingBuilder";
import guideMapPathBuilder from './guideMapPathBuilder';
import guidePageBuilder from "./guidePageBuilder";
import guideStyleBuilder from './guideStyleBuilder';

async function guideBuilder(githubUrl: string): Promise<GuideContent> {
    const githubEntries = await githubApi.fetchRepoEntries(githubUrl);
    const guide: GuideContent = {
        languages: {},
        images: [],
        mapPaths: [],
        styles: []
    };

    // Initialize groupedEntries with a proper type
    const groupedEntries: { [language: string]: { [fileType: string]: GithubEntry[] } } = {};

    githubEntries.entries.forEach((entry: GithubEntry) => {
        const { fileType, lng } = extractFileInfo(entry.path);

        // Ensure the language object exists
        if (!groupedEntries[lng]) {
            groupedEntries[lng] = {};
        }

        // Ensure the fileType array exists
        if (!groupedEntries[lng][fileType]) {
            groupedEntries[lng][fileType] = [];
        }

        // Now TypeScript knows groupedEntries[lng][fileType] is definitely initialized
        groupedEntries[lng][fileType].push(entry);
    });

    const processingPromises: Promise<void>[] = [];

    Object.entries(groupedEntries).forEach(([lng, types]) => {
        Object.entries(types).forEach(([type, entries]) => {
            switch (type) {
                case "md":
                    processingPromises.push(
                        guidePageBuilder(entries).then(pages => {
                            guide.languages[lng] = guide.languages[lng] || { pages: [], listing: [] };
                            guide.languages[lng].pages.push(...pages);
                        })
                    );
                    break;
                case "toml":
                    processingPromises.push(
                        guideListingBuilder(entries).then(listings => {
                            guide.languages[lng] = guide.languages[lng] || { pages: [], listing: [] };
                            guide.languages[lng].listing.push(...listings);
                        })
                    );
                    break;
                case "css":
                    processingPromises.push(
                        guideStyleBuilder(entries).then(styles => {
                            guide.styles.push(...styles);
                        })
                    );
                    break;
                case "jpg":
                case "png":
                    // processingPromises.push(
                    //     guideImageBuilder(entries).then(images => {
                    //         guide.images.push(...images);
                    //     })
                    // );
                    break;
                case "gpx":
                    processingPromises.push(
                        guideMapPathBuilder(entries).then(mapPaths => {
                            guide.mapPaths.push(...mapPaths);
                        })
                    );
                    break;
                default:
                    console.log(`Unknown filetype: ${type}`);
                    break;
            }
        });
    });

    // Handle all promises and finalize the guide object
    await Promise.all(processingPromises).then(() => {
        // fs.writeFileSync("guide.json", JSON.stringify(guide, null, 4));
        console.log('Success <3!');
    }).catch(error => {
        console.error('An error occurred during guide building:', error);
    });

    return guide;
}

export default guideBuilder
