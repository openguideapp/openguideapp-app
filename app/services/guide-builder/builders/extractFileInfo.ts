export interface FileInfo {
    lng: string;
    fileName: string;
    fileExtension: string;
    fileType?: string; 
}

export const extractFileInfo = (path: string): FileInfo => {
    const result: FileInfo = { lng: "", fileName: "", fileExtension: "" };
    const parts = path.split('/'); 

    if (parts.length > 2 && parts[0] === "content") {
        result.lng = parts[1];
    } else {
        result.lng = "none";
    }

    const filenameWithExtension = parts[parts.length - 1]; 

    const fileNameParts = filenameWithExtension.split('.');
    let fileType;
    if (fileNameParts.length === 3) {
        [result.fileName, fileType, result.fileExtension] = fileNameParts;
        result.fileType = fileType; 
    } else if (fileNameParts.length === 2) {
        [result.fileName, result.fileExtension] = fileNameParts;
    } else {
        result.fileName = fileNameParts[0];
        result.fileExtension = '';
    }

    return result;
};
