import React, { useState, ChangeEvent, useEffect } from "react";
import API from "../services/api";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [urls, setUrls] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>("No file uploaded");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMsg("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg("No file Selected for upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.url) {
        setUrls([...urls, res.data.url]);
        setMsg("File uploaded successfully");
      } else {
        setMsg("Error uploading file");
      }
    } catch (error) {
      setMsg("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await API.get("/api/urls");
        console.log("URLs:", res.data.urls);
        setUrls(res.data.urls);
      } catch (error) {
        console.error("Failed to fetch URL:", error);
      }
    };

    fetchUrl();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Upload
      </button>
      {msg && <p className="bg-gray-600 text-white w-1/2">{msg}</p>}
      <ul>{urls && urls.map((url, index) => <li key={index}>{url}</li>)}</ul>
    </div>
  );
};

export default Upload;
