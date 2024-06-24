export interface GuideImage {
    path: string,
    downloadUrl: string,
    width: number,
    height: number,
    blurHash: string,
}

export interface GuidePage {
    path: string,
    downloadUrl: string,
    html: string,
    meta: { [key: string]: string }[],
}

export interface GuideMapPath {
    path: string,
    downloadUrl: string,
    coordinates: GuideLatLng[],
}

export type GuideLatLng = {
    latitude: number;
    longitude: number;
};

export type GuideListing = {
    title: string,
    description: string,
    author: string,
    thumbnails: string[],
    tags: string[],
    downloadUrl: string,
}

export type GuideLng = {
    pages: GuidePage[],
    listing: GuideListing[],
};

export type GuideStylesCatalog = {
    [key: string]: GuideStylesDictionary
}

export type GuideStylesDictionary = {
    [key: string]: { [key: string]: string | number }
}

export type GuideStyle = {
    path: string,
    downloadUrl: string,
    styles: GuideStylesDictionary
};

export type dataTypes = GuideImage | GuidePage | GuideMapPath;

// TODO: einmal guide zum in der cloud speichern und einmal guide zum an die app senden!
export interface GuideContent {
    languages: {
        [lng: string]: {
            pages: GuidePage[],
            listing: GuideListing[],
        }
    },
    images: GuideImage[],
    mapPaths: GuidePage[],
    styles: GuideStyle[],
}

export interface GuideResponse {
    pages: GuidePage[],
    images: GuideImage[],
    mapPaths: GuidePage[],
    styles: GuideStyle[],
}