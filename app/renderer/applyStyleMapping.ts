import { GuideStylesDictionary } from '../guide-builder/src/types/data-types';

type Replacements = {
    [key: string]: string | number;
};


export const applyStyleMapping = (obj: GuideStylesDictionary, replacements: Replacements): GuideStylesDictionary => {
    // Deep copy the object to ensure immutability
    const newObj: GuideStylesDictionary = JSON.parse(JSON.stringify(obj));
    Object.keys(newObj).forEach((key) => {
        const nestedObj = newObj[key];
        Object.keys(nestedObj).forEach((nestedKey) => {
            const value = nestedObj[nestedKey];
            // Check if the value is a string that starts with '$'
            if (typeof value === 'string' && value.startsWith('$')) {
                const replacementKey = value.substring(1); // Remove the '$'
                if (Object.hasOwnProperty.call(replacements, replacementKey)) {
                    // if (replacementKey in replacements) {
                    nestedObj[nestedKey] = replacements[replacementKey];
                }
            }
        });
    });
    return newObj;
}