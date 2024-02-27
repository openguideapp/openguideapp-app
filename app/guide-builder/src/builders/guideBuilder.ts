// Assuming these imports are correctly pointing to your actual modules
import { githubApi, GithubEntry } from "../api/githubApi";
import { GuideContent } from "../types/data-types";

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

    githubEntries.entries.forEach((entry: GithubEntry) => {
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
    });

    const processingPromises: Promise<void>[] = [];

    // Iterate over languages
    Object.entries(groupedEntries).forEach(([lng, fileTypes]) => {
        // Iterate over fileTypes (including 'default' for those without a specific fileType)
        Object.entries(fileTypes).forEach(([type, fileExtensions]) => {
            // Iterate over fileExtensions within each fileType
            Object.entries(fileExtensions).forEach(([fileExtension, entries]) => {
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
                            break;

                        }
                        if (type === 'default') { // Only process listings if not a 'styles' type
                            processingPromises.push(
                                guideListingBuilder(entries).then(listings => {
                                    guide.languages[lng] = guide.languages[lng] || { pages: [], listing: [] };
                                    guide.languages[lng].listing.push(...listings);
                                })
                            );
                            break;
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

            });
        });
    });

    // Handle all promises and finalize the guide object
    await Promise.all(processingPromises).then(() => {
        console.log('Guide building completed successfully.');
    }).catch(error => {
        console.error('An error occurred during guide building:', error);
    });

    return guide;
}

export default guideBuilder
