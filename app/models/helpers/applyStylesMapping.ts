import type { GuideStylesDictionary } from '../../services/guide-builder/types/data-types';

type Replacements = {
    [key: string]: string | number;
};

export const applyStylesMapping = (obj: GuideStylesDictionary, stylesMappings: GuideStylesDictionary): GuideStylesDictionary => {
    const replacements = Object.values(stylesMappings).reduce<Replacements>((acc, current) => {
        return {
            ...acc,
            ...current,
        };
    }, {}); // Initial value for the accumulator is an empty object

    // Deep copy the object to ensure immutability
    const newObj: GuideStylesDictionary = JSON.parse(JSON.stringify(obj));
    for (const key of Object.keys(newObj)) {
        const nestedObj = newObj[key];
        for (const nestedKey of Object.keys(nestedObj)) {
            const value = nestedObj[nestedKey];
            // Check if the value is a string that starts with '$'
            if (typeof value === 'string' && value.startsWith('$')) {
                const replacementKey = value.substring(1); // Remove the '$'
                if (Object.hasOwnProperty.call(replacements, replacementKey)) {
                    nestedObj[nestedKey] = replacements[replacementKey];
                }
            }
        }
    }
    return newObj;
}
