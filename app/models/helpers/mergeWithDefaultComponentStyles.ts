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
    audioControls: {
        iconColor: "$primary500"
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
        maximumTrackTintColor: "$primary500",
        minimumTrackTintColor: "$primary400",
        thumbTintColor: "$primary500",
    },
    audioTimeContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", // This will place the time labels on the sides
    },
    audioTimeText: {
        color: "$primary500",
        // fontFamily: "",
    },
    videoColorContainer: {
        alignItems: "center",
        backgroundColor: "$neutral300",
        borderRadius: 10,
        justifyContent: "center",
        marginHorizontal: 5,
        padding: 10,
    },
    videoControlButton: {
        marginHorizontal: 5, // Space between buttons
        padding: 10, // Touchable area
        justifyContent: "center",
        alignItems: "center",
    },
    videoControls: {
        iconColor: "$primary500",
    },
    videoControlsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    videoPaddingContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        padding: 5,
    },
    videoPlayer: {
        width: 320, // Fixed width, can be adjusted
        height: 180, // Based on a 16:9 aspect ratio, can be adjusted
        borderRadius: 10, // Optional: for rounded corners
        overflow: "hidden", // Keeps the rounded corners effect
    },
    videoSlider: {
        flex: 1, // Take up all available space
        marginHorizontal: 10, // Space between text and slider
        maximumTrackTintColor: "$primary500",
        minimumTrackTintColor: "$primary400",
        thumbTintColor: "$primary500",
    },
    videoTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        width: "100%", // Ensure the slider and time text span the full container width
        paddingHorizontal: 20, // Padding to ensure content doesn't touch the edges
    },
    videoTimeText: {
        color: "$primary500",
        // fontFamily: typography.primary.normal,
        fontSize: 12, // Adjust based on your typography settings
    },
};
