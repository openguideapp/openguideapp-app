export interface FileInfo {
    lng: string;
    fileName: string;
    fileExtension: string;
    fileType?: string; // Optional fileType field
}

export const extractFileInfo = (path: string): FileInfo => {
    const result: FileInfo = { lng: "", fileName: "", fileExtension: "" };
    const parts = path.split('/'); // Split the path into segments

    if (parts.length > 2 && parts[0] === "content") {
        result.lng = parts[1];
    } else {
        result.lng = "none";
    }

    const filenameWithExtension = parts[parts.length - 1]; // The filename with extension is the last segment

    // Split the last segment into filename, fileType (if exists), and extension
    const fileNameParts = filenameWithExtension.split('.');
    let fileType;
    if (fileNameParts.length === 3) {
        // If there are 3 parts, then a fileType specifier exists
        [result.fileName, fileType, result.fileExtension] = fileNameParts;
        result.fileType = fileType; // Assign the fileType if it exists
    } else if (fileNameParts.length === 2) {
        // If only 2 parts, then no fileType specifier, just filename and extension
        [result.fileName, result.fileExtension] = fileNameParts;
    } else {
        result.fileName = fileNameParts[0]; // If no extension, just assign the filename
        result.fileExtension = '';
    }

    return result;
};
