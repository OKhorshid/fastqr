import Image from "next/image";
import { FormEvent, useState } from 'react'

export default function Home() {
const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: FormEvent) => {
   "use server"
    event.preventDefault();
    if (!file) return; // Ensure there is a file selected
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file!);

    // POST the formData to your API endpoint
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result); // Process the response here
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <form onSubmit={handleSubmit}>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />
          <br/>
          <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} 
        required/>
          <button type="submit" className="border border-white">submit</button>
        </form>
      </section>  
    </main>
  );
}