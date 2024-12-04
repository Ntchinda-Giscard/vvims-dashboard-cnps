import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (!file) {
            return; // No file selected
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            setMessage(""); // Clear any previous message
            const response = await axios.post("http://localhost:8000/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent: any) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Failed to upload file. Please try again.");
        } finally {
            setUploading(false);
            setUploadProgress(0); // Reset progress
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            {uploading && <p>Uploading... {uploadProgress}%</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;