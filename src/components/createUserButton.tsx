"use client";
import React, { useEffect } from "react";
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
        } catch {
          console.log("data not gottennn...");
        }
      }
    } catch (e: any) {
      console.error("status error: ", e.message);
    }
  };

  //event listener for the functions to run on component load
  useEffect(() => {
    // Function to parse the URL query parameters as to be used to check if authcode exists in href
    function getQueryParam(name: string) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    // Check if the expected token or code is in the URL
    const authUrl = getQueryParam("code");
    if (authUrl) {
      performCallbackFetch(window.location.href);
    }
  }, []);

  async function performCallbackFetch(authUrl: string) {
    const myHeaders = new Headers();
    myHeaders.append("url", authUrl);

    try {
      const callbackRes = await fetch("/api/callback", {
        headers: myHeaders,
      });

      if (callbackRes.ok) {
        const data = await callbackRes.json();
        console.log("Callback data received:", data);
        // Process the login, perhaps redirecting to a dashboard or home page
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
