import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { GuideImageModel } from "./GuideImage"
import { GuideMapPathModel } from "./GuideMapPath"
import { GuidePageModel } from "./GuidePage"
import { GuideStyle, GuideStyleModel } from './GuideStyle';

/**
 * Model description here for TypeScript hints.
 */
export const GuideStoreModel = types
  .model("GuideStore")
  .props({
    pages: types.array(GuidePageModel),
    images: types.array(GuideImageModel),
    mapPaths: types.array(GuideMapPathModel),
    // style: types.array(GuideStyleModel),
    styles: types.frozen({}),
    loading: false,
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get guideHomePage() {
      const homePage = self.pages.find(page => page.path === "home.md")
      if (homePage) {
        return homePage
      } else {
        return {
          path: "home.md",
          html: "<h1>Home Page Not Found!</h1>",
          meta: []
        }
      }
    },
    getGuidePage(path: string) {
      console.log(" --- inside getGuidePage model store ---")
      console.log("getGuidePage", path)
      // console.log("self.pages", self.pages.toJSON())
      const page = self.pages.find(page => page.path === path.toString())
      // console.log("page", page)
      if (page) {
        return page
      } else {
        return {
          path,
          html: `<h1>${path} Not Found!</h1>`,
          meta: []
        }
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchGuide(lng = "en") {
      store.setProp("loading", true)
      // const response = await api.getEpisodes()
      // if (response.kind === "ok") {
      //   store.setProp("episodes", response.episodes)
      // } else {
      //   console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      // }
      store.setProp("pages", guide.languages[lng].pages)
      store.setProp("images", guide.images)
      store.setProp("mapPaths", guide.mapPaths)
      store.setProp("styles", guide.styles)

      store.setProp("loading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GuideStore extends Instance<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotOut extends SnapshotOut<typeof GuideStoreModel> { }
export interface GuideStoreSnapshotIn extends SnapshotIn<typeof GuideStoreModel> { }
export const createGuideStoreDefaultModel = () => types.optional(GuideStoreModel, {})


const guide = {
  "languages": {
    "de": {
      "pages": [
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/de/frontmatter.md",
          "path": "content/de/frontmatter.md",
          "html": "<h1>Jupiter</h1>\n<button path=\"home.md\">Back to Home!</button>",
          "meta": {
            "layout": "solar-system"
          }
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/de/guide1.md",
          "path": "content/de/guide1.md",
          "html": "<p>Hello World 2 !</p>\n<p><button path=\"home.md\">Back to Home!</button></p>",
          "meta": {}
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/de/home.md",
          "path": "content/de/home.md",
          "html": "<h1>Hallo Welt!</h1>\n<p><button path=\"guide1.md\">To Guide 1!</button></p>\n<p><button path=\"imges.md\">To Images!</button></p>\n<p><button path=\"frontmatter.md\">Back to Home!</button></p>",
          "meta": {}
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/de/images.md",
          "path": "content/de/images.md",
          "html": "<button path=\"home.md\"></button>\n<h1>Images with remote Url</h1>\n<p><img src=\"https://images.unsplash.com/photo-1696461353431-32c529d4585d?ixlib=rb-4.0.3&#x26;ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D&#x26;auto=format&#x26;fit=crop&#x26;w=400&#x26;q=60\" alt=\"image\" title=\"Temple Title\"></p>\n<h1>::Image Rule</h1>\n<div></div>\n<h1>Inline Html</h1>",
          "meta": {}
        }
      ],
      "listing": [
        {
          "title": "Test Guide",
          "description": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          "author": "Johannes Biermann",
          "tags": [
            "museum",
            "test",
            "fruty"
          ],
          "downloadUrl": "https://github.com/openguideapp/openguideapp-test-guide"
        }
      ]
    },
    "en": {
      "pages": [
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/en/frontmatter.md",
          "path": "content/en/frontmatter.md",
          "html": "<h1>Jupiter</h1>\n<button path=\"home.md\">Back to Home!</button>",
          "meta": {
            "layout": "solar-system"
          }
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/en/guide1.md",
          "path": "content/en/guide1.md",
          "html": "<p>Hello World 2 !</p>\n<p><button path=\"home.md\">Back to Home!</button></p>",
          "meta": {}
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/en/home.md",
          "path": "content/en/home.md",
          "html": "<h1 style=\"font-size: 10em;\">Hello World!</h1>\n<p><button path=\"guide1.md\">To Guide 1!</button></p>\n<p><button path=\"imges.md\">To Images!</button></p>\n<p><button path=\"frontmatter.md\">Back to Home!</button></p>",
          "meta": {}
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/en/images.md",
          "path": "content/en/images.md",
          "html": "<button path=\"home.md\"></button>\n<h1>Images with remote Url</h1>\n<p><img src=\"https://images.unsplash.com/photo-1696461353431-32c529d4585d?ixlib=rb-4.0.3&#x26;ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D&#x26;auto=format&#x26;fit=crop&#x26;w=400&#x26;q=60\" alt=\"image\" title=\"Temple Title\"></p>\n<h1>::Image Rule</h1>\n<div></div>\n<h1>Inline Html</h1>",
          "meta": {}
        }
      ],
      "listing": [
        {
          "title": "Test Guide",
          "description": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          "author": "Johannes Biermann",
          "tags": [
            "museum",
            "test",
            "fruty"
          ],
          "downloadUrl": "https://github.com/openguideapp/openguideapp-test-guide"
        }
      ]
    },
    "en_US": {
      "pages": [
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/en_US/guide1.md",
          "path": "content/en_US/guide1.md",
          "html": "<p>Hello World 2 !</p>\n<button path=\"home.md\">Back to Home!</button>",
          "meta": {}
        },
        {
          "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/content/en_US/home.md",
          "path": "content/en_US/home.md",
          "html": "<h1>Hello World! en_US</h1>\n<p><button path=\"guide1.md\">To Guide 1!</button></p>\n<p><button path=\"imges.md\">To Images!</button></p>\n<p><button path=\"frontmatter.md\">Back to Home!</button></p>",
          "meta": {}
        }
      ],
      "listing": []
    },
    "none": {
      "pages": [],
      "listing": [
        {
          "downloadUrl": "https://github.com/openguideapp/openguideapp-test-guide"
        }
      ]
    }
  },
  "images": [
    {
      "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/media/images/success.png",
      "path": "media/images/success.png",
      "width": 832,
      "height": 832,
      "blurHash": "UI8iPgXUD4nf^CR,H;s6jEM|k]xTA5Sl#gx8"
    }
  ],
  "mapPaths": [],
  "styles": [
    // {
    //   "path": "theme/style.css",
    //   "downloadUrl": "https://raw.githubusercontent.com/openguideapp/openguideapp-test-guide/main/theme/style.css",
    //   "style":
    {
      "body": {
        "color": "pink",
        "fontStyle": "italic",
        "backgroundColor": "yellow",
        "textAlign": "center",
        // "background-color": "black",
        "whiteSpace": "pre-wrap",
        "white-space": "pre-wrap",

        "border": "1px solid black",
        "borderLeftColor": "red",
      },
      "a": {
        "color": "green"
      },
      "#red": {
        "color": "red"
      },
      ".red": {
        "color": "red"
      }
    }
    // }
  ]
}