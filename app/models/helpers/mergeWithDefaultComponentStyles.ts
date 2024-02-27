import { GuideStylesDictionary } from 'app/guide-builder/src/types/data-types';

export const mergeWithDefaultComponentStyles = (customComponentStyles: GuideStylesDictionary): GuideStylesDictionary => {
    return { ...defaultComponentStyles, ...customComponentStyles }
}

const defaultComponentStyles: GuideStylesDictionary = {
    /*
    *  Audio Player Renderer
    */
    audioColorContainer: {
        alignItems: "center",
        backgroundColor: "$accent300",
        borderRadius: 10,
        justifyContent: "center",
        marginHorizontal: 5,
        padding: 10,
    },
    audioControlsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    audioPaddingContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        padding: 5,
    },
    audioSlider: {
        color: "$accent300",
        height: 40,
        width: "80%",
    },
    audioTimeContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", // This will place the time labels on the sides
        // marginBottom: 10, // Add some space above the controls
    },
    audioTimeText: {
        color: "$primary500",
        fontFamily: typography.primary.normal,
    }
};
