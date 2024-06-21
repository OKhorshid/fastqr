 // pages/api/upload.js
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
    data?: any; // Define a more specific type based on your data structure
  };
  
export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {
        // Extract the name and file from the request
        //const { name, file } = req.body;
  
        // Here you would typically add the logic to upload the file to Vercel Store.
        // Since Vercel Store's direct SDK or API for serverless functions is not well-documented,
        // you would generally handle this via a custom server or by using third-party storage solutions integrated with Vercel.
  
            if (req.method === 'POST') {
              // Assume you handle the POST request here
              const data = req.body; // Data sent in the POST request
              res.status(200).json({ message: "Data received", data });
            } else {
              // Handle any non-POST requests
              res.setHeader('Allow', ['POST']);
              res.status(405).json({ message: `Method ${req.method} Not Allowed` });
            }
  }
  