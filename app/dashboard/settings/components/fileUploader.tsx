import axios, { AxiosProgressEvent } from "axios";
import React, { useState } from "react";
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import axiosClient from "@/app/dashboard/settings/components/axiosClient";
import { Progress } from "@mantine/core";

export default function  FileUpload(){
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [enough, setEnough] = useState(true);

    const handleFileChange = async (event: any) => {
        setEnough(true);
        const file = event.target.files[0];

        if (!file) {
            setMessage("No file selected.");
            return;
        }
        // Show preview
        const objectUrl: string = URL.createObjectURL(file);
        // @ts-ignore
        setPreview(objectUrl);

        const formData = new FormData();
        formData.append("face", file);
        formData.append("upload_type", 'local');

        try {
            const response = await axiosClient.post("/api/v1/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    //@ts-ignore
                    const percentCompleted: number = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted)
                    setMessage(`Upload progress: ${percentCompleted}%`);
                },
            });

            setMessage(`Upload successful: ${response.data.message}`);
            setEnough(false);
        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className={classes.fileinputcontainer}>
            <label htmlFor="fileInput" className={classes.fileinputlabel}>
                Update Profile
            </label>
            <input
                type="file"
                accept="image/*"
                className={classes.fileinput}
                onChange={handleFileChange}
            />
            {(message && enough) &&
                <Progress.Root size="xl" mt={10} >
                    <Progress.Section value={progress} animated color="cyan">
                        <Progress.Label>{message}</Progress.Label>
                    </Progress.Section>
                </Progress.Root>
            }
            {preview && <img src={preview} alt="Preview" style={{ width: "300px", maxHeight: "200px", marginTop: "10px" }} />}
            {message && <p>{message}</p>}
        </div>
    );
};