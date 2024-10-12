import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamDocuments = () => {
    const { teamId } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('document', selectedFile);

            await axios.post(`http://localhost:5000/api/teams/${teamId}/documents`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Document uploaded successfully');
            setSelectedFile(null);
        }
    };

    return (
        <div>
            <h2>Upload Documents for Team {teamId}</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default TeamDocuments;
