import { HTMLContentModel, HTMLElementModel } from "react-native-render-html";

export const customHTMLElementModels = {
  button: HTMLElementModel.fromCustomModel({
    tagName: "button",
    contentModel: HTMLContentModel.mixed,
  }),
  audio: HTMLElementModel.fromCustomModel({
    tagName: "audio",
    contentModel: HTMLContentModel.block,
  }),
  video: HTMLElementModel.fromCustomModel({
    tagName: "video",
    contentModel: HTMLContentModel.block,
  }),
}