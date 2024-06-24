import type { GuideStylesDictionary } from 'app/services/guide-builder/types/data-types';
import { colors } from 'app/theme';


const { palette, ...colorsWithoutPalette } = colors
const colorPalette = palette
const colorMapping = colorsWithoutPalette
const defaultThemeStyles = { colorPalette, colorMapping }

export const mergeWithDefaultThemeStyles = (customThemeStyles: GuideStylesDictionary): GuideStylesDictionary => {
    return { ...defaultThemeStyles, ...customThemeStyles }
}

