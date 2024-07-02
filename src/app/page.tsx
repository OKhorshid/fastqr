"use client";
import CreateUserButton from "@/components/createUserButton";
import React from "react";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="font-medium text-xl mb-4">Login:</h1>
      <CreateUserButton />
    </main>
  );
};

export default Home;
