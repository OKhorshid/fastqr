'use client';
 
import Loading from "@/components/loading";
import type { PutBlobResult } from "@vercel/blob";
import Script from "next/script";
import { useState, useRef, Suspense, use } from "react";
import QRCode from "react-qr-code";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [qrReady, setQrState] = useState(false);
  const [value, setValue] = useState();
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      setMessage("No file selected");
      return;
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
      setMessage("Upload successful");
    } catch (error) {
      setMessage("Failed to upload: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQr = () => {
    setQrState(true);
  };

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
          <button
            className={`ml-5 border-2 p-2 ${
              isLoading
                ? "bg-purple-950 border-slate-500"
                : "bg-green-600 border-white"
            }`}
            onClick={() => setQrState(true)}
          >
            Generate QR Code
          </button>
          {qrReady && (
            <QRCode
              value={blob.url}
              bgColor={back}
              fgColor={fore}
              size={size}
            />
          )}
        </div>
      )}
    </>
  );
}