import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { GuideListing, GuideListingModel } from "./GuideListing"

const mockGuideListings = [
  {
    "title": "Test Guide",
    "author": "Johannes Biermann",
    "description": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    "thumbnails": [
      "https://unsplash.it/400/400?image=1",
      "https://unsplash.it/400/400?image=1",
      "https://unsplash.it/400/400?image=1"
    ],
    "tags": [
      "museum",
      "test",
      "fruity"
    ]
  },
  {
    "title": "Test Guide",
    "author": "Johannes Biermann",
    "description": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    "thumbnails": [
      "https://unsplash.it/400/400?image=1",
      "https://unsplash.it/400/400?image=1",
      "https://unsplash.it/400/400?image=1"
    ],
    "tags": [
      "museum",
      "test",
      "fruity"
    ]
  },
  {
    "title": "Test Guide",
    "author": "Johannes Biermann",
    "description": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    "thumbnails": [
      "https://unsplash.it/400/400?image=1",
      "https://unsplash.it/400/400?image=1",
      "https://unsplash.it/400/400?image=1"
    ],
    "tags": [
      "museum",
      "test",
      "fruity"
    ]
  },
]


/**
 * Model description here for TypeScript hints.
 */
export const GuideListingStoreModel = types
  .model("GuideListingStore")
  .props({
    guideListings: types.array(GuideListingModel),
    favorites: types.array(types.reference(GuideListingModel)),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get guideListingsForList() {
      return store.favoritesOnly ? store.favorites : store.guideListings
    },

    hasFavorite(episode: GuideListing) {
      return store.favorites.includes(episode)
    },
  }))
  .actions((store) => ({
    async fetchGuideListings() {
      // const response = await api.getGuideListings()

      const response = {
        kind: "ok",
        guideListings: mockGuideListings
      }


      if (response.kind === "ok") {
        store.setProp("guideListings", response.guideListings)
      } else {
        console.error(`Error fetching guideListings: ${JSON.stringify(response)}`)
      }
    },
    addFavorite(episode: GuideListing) {
      store.favorites.push(episode)
    },
    removeFavorite(episode: GuideListing) {
      store.favorites.remove(episode)
    },
  }))
  .actions((store) => ({
    toggleFavorite(episode: GuideListing) {
      if (store.hasFavorite(episode)) {
        store.removeFavorite(episode)
      } else {
        store.addFavorite(episode)
      }
    },
  }))

export interface GuideListingStore extends Instance<typeof GuideListingStoreModel> { }
export interface GuideListingStoreSnapshotOut extends SnapshotOut<typeof GuideListingStoreModel> { }
export interface GuideListingStoreSnapshotIn extends SnapshotIn<typeof GuideListingStoreModel> { }
export const createGuideListingStoreDefaultModel = () => types.optional(GuideListingStoreModel, {})
