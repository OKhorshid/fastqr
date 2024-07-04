import { redirect } from "next/navigation";
import React from "react";

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

  const redirectToSign = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "GET",
      });
    } catch (e) {
      console.log("erroorrrr: ", e);
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
