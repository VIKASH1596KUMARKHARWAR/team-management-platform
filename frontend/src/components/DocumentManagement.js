// DocumentManagement.js
import React, { useState } from 'react';

const DocumentManagement = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Perform file upload logic (API call to backend or cloud storage)
            console.log("File to be uploaded:", selectedFile);
            alert(`File ${selectedFile.name} uploaded successfully.`);
            setSelectedFile(null);
        } else {
            alert("Please select a file first.");
        }
    };

    return (
        <div className="document-management">
            <h2>Document Management</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Document</button>
        </div>
    );
};

export default DocumentManagement;
