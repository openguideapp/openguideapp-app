export type FileInfo = {
    lng: string;
    fileName: string;
    fileType: string;
};

export const extractFileInfo = (path: string): FileInfo => {
    const result: FileInfo = { lng: "", fileName: "", fileType: "" };
    const parts = path.split('/'); // Split the path into segments
    if (parts.length > 2 && parts[0] === "content") {
        result.lng = parts[1];
    } else {
        // console.log("parts", parts)

        result.lng = "none";
    }
    const filenameWithExtension = parts[parts.length - 1]; // The filename with extension is the last segment
    const [fileName, fileType] = filenameWithExtension.split('.'); // Split the last segment into filename and extension
    result.fileName = fileName;
    result.fileType = fileType || ''
    return result;
};

