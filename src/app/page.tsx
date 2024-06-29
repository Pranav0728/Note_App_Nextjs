"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // This should be called once at the beginning of the function
    const email = e.target[0].value;
    const username = e.target[1].value;
    setError("");

    try {
      const response = await fetch("https://notes-app-nextjs-one.vercel.app/api/users");
      const data = await response.json();
      const user = data.find((user: any) => user.email === email && user.username === username);
      
      if (user) {
        const userId = user._id;
        router.replace("/home?userId=" + userId);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("An error occurred while checking the user");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="md:text-3xl text-xl mb-5 md:m-10 text-white text-center">
        Welcome to NoteApp
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-between bg-white p-5 md:p-10 rounded-md"
      >
        <h1 className="text-2xl text-black m-2 font-bold">Login Page</h1>
        <input
          type="text"
          className="border text-lg w-56 md:w-80 p-2 m-2 rounded-md"
          placeholder="Enter email"
        />
        <input
          type="text"
          className="border text-lg w-56 md:w-80 p-2 m-2 rounded-md"
          placeholder="Enter username"
        />
        <p className="text-red-900 font-bold text-lg">{error}</p>
        <button className="btn btn-primary rounded-md text-lg mt-5">
          Login
        </button>
        <Link href="/register">
          <p className="text-xl text-black mt-3">New User? Register</p>
        </Link>
      </form>
    </main>
  );
}
