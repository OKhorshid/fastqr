import Image from "next/image";
import { FormEvent } from 'react'

export default function Home() {
  
  async function onSubmit(event: HTMLFormElement) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    // ...

  }    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <form action="">
          <input type='text'/>
          <br/>
          <input type="file"/>
          <button className="border border-white">submit</button>
        </form>
      </section>  
    </main>
  );
}
