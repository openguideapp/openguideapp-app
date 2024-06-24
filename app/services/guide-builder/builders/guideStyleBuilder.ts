import * as changeCase from "change-case";
import toml from "toml";

import { githubApi, type GithubEntry } from "../api/githubApi";
import type { GuideStyle } from "../types/data-types";

function transformStyleToPascalCaseIfAllowed(simplifiedCSS: { [key: string]: { [key: string]: string } | undefined }, allowedStyles: string[]) {
    const result: { [key: string]: { [key: string]: string } } = {};

    for (const selector of Object.keys(simplifiedCSS)) {
        const properties = simplifiedCSS[selector];
        if (properties) { // Check if 'properties' is not undefined
            result[selector] = {};

            for (const property of Object.keys(properties)) {
                const camelCaseProperty = changeCase.camelCase(property);
                if (allowedStyles.includes(property) || allowedStyles.includes(camelCaseProperty)) {
                    // If the property is allowed, add it to the result object
                    result[selector][camelCaseProperty] = properties[property];
                }
            }
        }
    }

    return result;
}

async function guideStyleBuilder(entries: GithubEntry[]): Promise<GuideStyle[]> {
    const styles: GuideStyle[] = [];

    for (const entry of entries) {
        try {
            const tomlSource = await githubApi.downloadString(entry.uri);
            const parsedToml = toml.parse(tomlSource);

            const parsedStyles: { [key: string]: { [key: string]: string } } = {};

            // Iterate over each key in the parsed TOML data using a safer approach
            for (const key in parsedToml) {
                // Use Object.hasOwnProperty.call for a safer property check
                if (Object.hasOwnProperty.call(parsedToml, key)) {
                    // Ensure each style key maps to an object with string key-value pairs
                    parsedStyles[key] = parsedToml[key];
                }
            }

            for (const key of Object.keys(parsedToml)) {
                parsedStyles[key] = { ...parsedToml[key]?.attributes };
            }

            const guideStyle: GuideStyle = {
                path: entry.path,
                downloadUrl: entry.uri,
                styles: parsedStyles,
            };

            styles.push(guideStyle);

        } catch (error) {
            console.error(`Failed to process URL ${entry.uri}:`, error);
            // Handle error, possibly by continuing to the next URL
        }
    }

    return styles;
}

export default guideStyleBuilder;

// async function guideStyleBuilder(entries: GithubEntry[]): Promise<GuideStyle[]> {
//     const styles: GuideStyle[] = [];

//     for (const entry of entries) {
//         try {
//             const cssSource = await githubApi.downloadString(entry.uri);
//             const parsedCSS = toJSON(cssSource)?.children;

//             const simplifiedCSS: {
//                 [key: string]: { [key: string]: string },
//             } = {};

//             for (const key of Object.keys(parsedCSS)) {
//                 simplifiedCSS[key] = { ...parsedCSS[key]?.attributes };
//             }

//             const transformedCSS = transformStyleToPascalCaseIfAllowed(simplifiedCSS, allowedStrings);

//             const guideStyle: GuideStyle = {
//                 path: entry.path,
//                 downloadUrl: entry.uri,
//                 style: { ...transformedCSS },
//             };

//             styles.push(guideStyle);

//         } catch (error) {
//             console.error(`Failed to process URL ${entry.uri}:`, error);
//             // Handle error, possibly by continuing to the next URL
//         }
//     }

//     return styles;
// }

// export default guideStyleBuilder;
