import { extractFileInfo } from "../builders/extractFileInfo";

test("extract file info from path", () => {
  const path = "content/en/sample.md";
  const info = extractFileInfo(path);
  expect(info).toEqual({
    lng: "en",
    fileName: "sample",
    fileExtension: "md",
    fileType: undefined,
  });
});
