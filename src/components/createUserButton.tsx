"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CreateUserButton: React.FC = () => {
  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch: " + response.statusText);
      }
      const data = await response.json(); // This should only run if the response is OK
      alert(`User created: ${data.user.id}`);
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      alert("Error: " + error.message);
    }
  };

  const router = useRouter();
  const redirectToSign = async () => {
    "use client";
    try {
      const response = await fetch("/api/login", {
        method: "GET",
      });
      console.log("done");

      if (response) {
        try {
          const url = await response.text();
          console.log("redirecting to: ", url);
          window.location.href = url;
        } catch {
          console.log("data not gottennn...");
        }
      }
    } catch (e: any) {
      console.error("status error: ", e.message);
    }
  };

  return (
    <button
      onClick={() => redirectToSign()}
      className="border-2 border-red-300 rounded-lg bg-slate-700 p-2"
    >
      Signup with Google
    </button>
  );
};

export default CreateUserButton;
