import { githubApi, type GithubEntry } from "../api/githubApi";
import type { GuideContent } from "../types/data-types";

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

    // Initialize groupedEntries to also consider fileType
    const groupedEntries: { [language: string]: { [fileType: string]: { [fileExtension: string]: GithubEntry[] } } } = {};

    for (const entry of githubEntries.entries) {
        const { fileExtension, fileType, lng } = extractFileInfo(entry.path);

        // Ensure the language object exists
        if (!groupedEntries[lng]) {
            groupedEntries[lng] = {};
        }

        // Determine the grouping key based on fileType existence
        const groupKey = fileType || 'default';

        // Ensure the fileType object exists
        if (!groupedEntries[lng][groupKey]) {
            groupedEntries[lng][groupKey] = {};
        }

        // Ensure the fileExtension array exists
        if (!groupedEntries[lng][groupKey][fileExtension]) {
            groupedEntries[lng][groupKey][fileExtension] = [];
        }

        // Add the entry to the correct group
        groupedEntries[lng][groupKey][fileExtension].push(entry);
    }

    const processingPromises: Promise<void>[] = [];

    // Iterate over languages
    for (const [lng, fileTypes] of Object.entries(groupedEntries)) {
        // Iterate over fileTypes (including 'default' for those without a specific fileType)
        for (const [type, fileExtensions] of Object.entries(fileTypes)) {
            // Iterate over fileExtensions within each fileType
            for (const [fileExtension, entries] of Object.entries(fileExtensions)) {
                switch (fileExtension) {
                    case "md":
                        processingPromises.push(
                            guidePageBuilder(entries).then(pages => {
                                guide.languages[lng] = guide.languages[lng] || { pages: [], listing: [] };
                                guide.languages[lng].pages.push(...pages);
                            })
                        );
                        break;
                    case "toml":
                        if (type === 'styles') {
                            processingPromises.push(
                                guideStyleBuilder(entries).then(styles => {
                                    guide.styles.push(...styles);
                                })
                            );
                        } else if (type === 'default') { // Only process listings if not a 'styles' type
                            processingPromises.push(
                                guideListingBuilder(entries).then(listings => {
                                    guide.languages[lng] = guide.languages[lng] || { pages: [], listing: [] };
                                    guide.languages[lng].listing.push(...listings);
                                })
                            );
                        }
                        break;
                    case "css":
                        // Assuming CSS files are not tied to a specific fileType or are handled globally
                        processingPromises.push(
                            guideStyleBuilder(entries).then(styles => {
                                guide.styles.push(...styles);
                            })
                        );
                        break;
                    case "jpg":
                    case "png":
                        // Uncomment and implement guideImageBuilder if images need to be processed
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
                        console.log(`Unhandled combination of fileType: ${type} and fileExtension: ${fileExtension}`);
                        break;
                }
            }
        }
    }

    // Handle all promises and finalize the guide object
    await Promise.all(processingPromises).then(() => {
        console.log('Guide building completed successfully.');
    }).catch(error => {
        console.error('An error occurred during guide building:', error);
    });

    return guide;
}

export default guideBuilder;
