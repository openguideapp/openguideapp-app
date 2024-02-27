import { GuideStylesDictionary } from 'app/guide-builder/src/types/data-types';
import { colors, typography } from 'app/theme';


const { palette, ...colorsWithoutPalette } = colors
const colorsPalette = palette
const colorsMapping = colorsWithoutPalette
const defaultThemeStyles = { colorsPalette, colorsMapping }

export const mergeWithDefaultThemeStyles = (customBaseStyles: GuideStylesDictionary): GuideStylesDictionary => {
    return { ...defaultThemeStyles, ...customBaseStyles }
}

