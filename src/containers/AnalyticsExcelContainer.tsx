import React, { useState } from "react";
import FileUpload from "../components/analytics/FileUpload";
import SheetSelector, { FileInfo } from "../components/analytics/SheetSelector";

const AnalyticsExcelContainer: React.FC = () => {
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

    return !fileInfo ? (
        <FileUpload onUploadSuccess={setFileInfo} />
    ) : (
        <SheetSelector fileInfo={fileInfo} />
    );
};

export default AnalyticsExcelContainer;
