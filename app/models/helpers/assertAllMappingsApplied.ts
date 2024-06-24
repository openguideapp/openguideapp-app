import type { GuideStylesDictionary } from "app/services/guide-builder/types/data-types";

export function assertAllMappingsApplied(obj: GuideStylesDictionary): void {
    for (const [key, nestedObj] of Object.entries(obj)) {
        for (const [nestedKey, value] of Object.entries(nestedObj)) {
            if (typeof value === 'string' && value.startsWith('$')) {
                throw new Error(`Invalid value "${value}" found at ${key}.${nestedKey}`);
            }
        }
    }
}
