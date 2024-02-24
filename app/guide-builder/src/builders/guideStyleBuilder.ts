import * as changeCase from "change-case";
import { toJSON } from "css-convert-json";

import { githubApi, GithubEntry } from "../api/githubApi";
import { GuideStyle } from "../types/data-types";

const allowedStrings: string[] = ["background-color", "font-size", "color", "font-weight", "whiteSpace"];

function transformStyleToPascalCaseIfAllowed(simplifiedCSS: { [key: string]: { [key: string]: string } | undefined }, allowedStyles: string[]) {
    const result: { [key: string]: { [key: string]: string } } = {};

    Object.keys(simplifiedCSS).forEach(selector => {
        const properties = simplifiedCSS[selector];
        if (properties) { // Check if 'properties' is not undefined
            result[selector] = {};

            Object.keys(properties).forEach(property => {
                const camelCaseProperty = changeCase.camelCase(property);
                if (allowedStyles.includes(property) || allowedStyles.includes(camelCaseProperty)) {

                    // If the property is allowed, add it to the result object
                    result[selector][camelCaseProperty] = properties[property];
                }
            });
        }
    });

    return result;
}


async function guideStyleBuilder(entries: GithubEntry[]): Promise<GuideStyle[]> {
    const styles: GuideStyle[] = [];

    for (const entry of entries) {
        try {
            const cssSource = await githubApi.downloadString(entry.uri);
            const parsedCSS = toJSON(cssSource)?.children;

            const simplifiedCSS: {
                [key: string]: { [key: string]: string },
            } = {};

            Object.keys(parsedCSS).forEach(key => {
                simplifiedCSS[key] = { ...parsedCSS[key]?.attributes }
            });

            const transformedCSS = transformStyleToPascalCaseIfAllowed(simplifiedCSS, allowedStrings);

            const guideStyle: GuideStyle = {
                path: entry.path,
                downloadUrl: entry.uri,
                style: { ...transformedCSS },
            }

            styles.push(guideStyle);

        } catch (error) {
            console.error(`Failed to process URL ${entry.uri}:`, error);
            // Handle error, possibly by continuing to the next URL
        }
    }

    return styles;
}

export default guideStyleBuilder


