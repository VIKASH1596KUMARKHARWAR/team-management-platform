import React, { useState } from 'react';
import axios from 'axios';

const TeamDocuments = ({ teamId }) => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:5000/api/${teamId}/documents`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('File uploaded successfully!');
            setError(null);
        } catch (err) {
            setError('Error uploading file');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Upload Documents</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default TeamDocuments;