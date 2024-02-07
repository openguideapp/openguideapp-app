import { HTMLContentModel, HTMLElementModel } from "react-native-render-html";

export const customHTMLElementModels = {
  button: HTMLElementModel.fromCustomModel({
    tagName: "button",
    contentModel: HTMLContentModel.mixed,
  }),
}