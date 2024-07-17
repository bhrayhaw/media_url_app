import React, { useState, ChangeEvent } from "react";
import API from "../services/api";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [msg, setMsg] = useState<string>("No file uploaded");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/api/upload", formData);
      setMsg('File uploaded successfully');
      setUrl(res.data.url);
    } catch (error) {
      setMsg('Error uploading file');
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Upload
      </button>
      {url && (
        <p>
          Uploaded URL: <a href={url}>{url}</a>
        </p>
      )}
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Upload;
