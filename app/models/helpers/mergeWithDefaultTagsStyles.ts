import type { GuideStylesDictionary } from 'app/services/guide-builder/types/data-types';

export const mergeWithDefaultTagsStyles = (customTagStyles: GuideStylesDictionary): GuideStylesDictionary => {
    return { ...defaultTagsStyles, ...customTagStyles }
}

const defaultTagsStyles: GuideStylesDictionary = {
    a: {
        color: "$text",
        backgroundColor: "rgba(187, 239, 253, 0.3)",
    },
    h1: {
    },
    h2: {
    },
    h3: {
    },
    h4: {
    },
    h5: {
    },
    h6: {
    },
    p: {
    },
    hr: {
    },
    pre: {
    },
    ol: {
    },
    ul: {
    },
    li: {
    },
    div: {
    },
    em: {
    },
    strong: {
    },
    b: {
    },
    u: {
    },
    span: {
    },
    br: {
    },
    code: {
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        fontSize: 14,
    },
    blockquote: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "$neutral400",
        borderLeftWidth: 10,
        borderLeftColor: "$neutral500",
    },
    img: {
        alignSelf: "center",
    },
};
