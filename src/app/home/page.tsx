"use client"
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const title = event.target[0].value;
    const description = event.target[1].value;
    const userId = searchParams.get('userId');
    
    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }
    
    setError("");
    
    try {
      const response = await fetch(`http://notes-app-nextjs-one.vercel.app/api/notes?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          userId,
        }),
      });
      
      if (response.status === 200) {
        setError("");
        alert("Successfully Registered");
        event.target[0].value = "";
        event.target[1].value = "";
      }
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-lg md:text-2xl">Enter your Note</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input
          type="text"
          name="title"
          className="border p-2 m-5 w-60 md:w-80"
          placeholder="Enter Title"
          required
        />
        <textarea
          name="note"
          className="border p-2 m-2 w-60 md:w-80"
          rows={7}
          placeholder="Enter Text"
          required
        ></textarea>
        <button type="submit" className="btn btn-primary rounded-md">
          Submit
        </button>
        <p>{error}</p>
      </form>
    </main>
  );
}
