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

      if (response.ok) {
        try {
          const url = await response.text();
          console.log("redirecting to: ", url);
          window.location.href = url;

          window.document.addEventListener("load", () => {
            // Function to parse the URL query parameters
            function getQueryParam(name: string) {
              const urlParams = new URLSearchParams(window.location.search);
              return urlParams.get(name);
            }
            console.log("aaaaaaaaaa");
            // Check if the expected token or code is in the URL
            const authUrl = getQueryParam(url);
            if (authUrl) {
              console.log("Auth code received:", authUrl);
              // Optionally, perform some client-side logic here
              performCallbackFetch(authUrl);
            } else {
              console.error("No auth code found in the URL.");
            }
          });
        } catch {
          console.log("data not gottennn...");
        }
      }
    } catch (e: any) {
      console.error("status error: ", e.message);
    }
  };

  async function performCallbackFetch(authUrl: string) {
    console.log("wasalnaa");
    try {
      const myHeaders = new Headers();
      myHeaders.append("url", authUrl);
      const callbackRes = await fetch("/callback", {
        headers: myHeaders,
      });

      if (callbackRes.ok) {
        const data = await callbackRes.json();
        console.log("Callback data received:", data);
        // Process the login, perhaps redirecting to a dashboard or home page
      } else {
        throw new Error("Callback fetch failed");
      }
    } catch (error: any) {
      console.error("Error during callback fetch:", error.message);
    }
  }
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
