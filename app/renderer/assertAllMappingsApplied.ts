import { GuideStylesDictionary } from "app/guide-builder/src/types/data-types";



export function assertAllMappingsApplied(obj: GuideStylesDictionary): void {
    Object.entries(obj).forEach(([key, nestedObj]) => {
        Object.entries(nestedObj).forEach(([nestedKey, value]) => {
            if (typeof value === 'string' && value.startsWith('$')) {
                throw new Error(`Invalid value "${value}" found at ${key}.${nestedKey}`);
            }
        });
    });
}
