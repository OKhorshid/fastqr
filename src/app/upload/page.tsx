'use client';
 
import Loading from "@/components/loading";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, Suspense } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      setMessage("No file selected");
      return;
    }

    setIsLoading(true); // Disable the button by setting isLoading to true
    const file = inputFileRef.current.files[0];

    fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload");
        }
        return response.json();
      })
      .then((newBlob: PutBlobResult) => {
        setBlob(newBlob);
        setMessage("Upload successful");
      })
      .catch((error) => {
        setMessage("Failed to upload: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!inputFileRef.current?.files) {
  //     throw new Error("No file selected");
  //   }

  //   setIsLoading(true); // Disable the button by setting isLoading to true
  //   const file = inputFileRef.current.files[0];

  //   try {
  //     const response = await fetch(`/api/upload?filename=${file.name}`, {
  //       method: "POST",
  //       body: file,
  //     });

  //     if (!response.ok) {
  //       setMessage("Failed to upload");
  //       throw new Error("Failed to upload");
  //     }

  //     const newBlob = (await response.json()) as PutBlobResult;
  //     setBlob(newBlob);
  //   } catch (error) {
  //     setMessage("Failed to upload");
  //   } finally {
  //     setIsLoading(false); // Re-enable the button by setting isLoading to false
  //     setMessage("upload successful");
  //   }
  // };
  return (
    <>
      <h1>Upload Your File</h1>

      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button
          type="submit"
          className={`ml-5 border-2 p-2 ${
            isLoading
              ? "bg-purple-950 border-slate-500"
              : "bg-blue-800 border-white"
          }`}
          disabled={isLoading}
        >
          Upload
        </button>
      </form>
      {message && (
        <div className="my-3 text-green-400 font-bold">{message}</div>
      )}

      {isLoading && <Loading />}
      {blob && (
        <div>
          Blob url:{" "}
          <a href={blob.url} target="_blank">
            {blob.url}
          </a>
        </div>
      )}
    </>
  );
}