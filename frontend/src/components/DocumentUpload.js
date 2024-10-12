import React, { useState } from 'react';

const DocumentUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        // Implement your file upload logic here
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully!");
                setFile(null); // Clear the selected file
            } else {
                alert("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        }
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default DocumentUpload;
