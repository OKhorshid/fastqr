import Image from "next/image";
import { FormEvent, useState } from 'react'
import { put } from "@vercel/blob";


export default function Home() {
const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: FormEvent) => {
   alert("submitted, file not recieved by server throw...")
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <form onSubmit={handleSubmit}>
          <input type='text' name="link" value='' />
          <br/>
          <input type="file" name="menu" required/>
          <button type="submit" className="border border-white">submit</button>
        </form>
      </section>  
    </main>
  );
}