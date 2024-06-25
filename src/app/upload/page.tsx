'use client';
 
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    setIsLoading(true); // Disable the button by setting isLoading to true
    const file = inputFileRef.current.files[0];

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload");
      }

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
    } catch (error) {
      setMessage("upload successful");
    } finally {
      setIsLoading(false); // Re-enable the button by setting isLoading to false
    }
  };
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}