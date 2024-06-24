import type { GuideStylesDictionary } from 'app/services/guide-builder/types/data-types';

export const mergeWithDefaultBaseStyles = (customBaseStyles: GuideStylesDictionary): GuideStylesDictionary => {
    return { ...defaultBaseStyles, ...customBaseStyles }
}

const defaultBaseStyles: GuideStylesDictionary = {
    base: {
        color: "#1c1e21",
        fontSize: 16,
        lineHeight: 16 * 1.8,
    }
};
