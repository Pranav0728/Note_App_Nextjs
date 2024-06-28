
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from "react";


export default function Home() {
  const [error, setError] = useState("")
  const router = useRouter()
  const  isValidEmail=(email:any)=> {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
  
  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const username = e.target[1].value;
    if(!isValidEmail(email)){
      setError("Invalid email")
      return;
    }
    setError("")
    try {
      const response = await fetch("/api/users",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
        })
      })
      if(response.status==200){
        setError("")
        alert("Succesfully Registered") 
        e.target[0].value = "";
        e.target[1].value = "";
        router.replace("/")
      }
      
    } catch (error:any) {
      return setError(error.message)
    }
    
  }
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="md:text-3xl text-xl mb-5 md:m-10 text-white text-center">Welcome to NoteApp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between bg-white p-5 md:p-10 rounded-md">
        <h1 className="text-2xl text-black m-2 font-bold">Register</h1>
        <input type="text"   className="border text-lg w-56 md:w-80 p-2 m-2 rounded-md" placeholder="Enter email"/>
        <input type="text"   className="border text-lg w-56 md:w-80 p-2 m-2 rounded-md" placeholder="Enter username" />
        {/* <input type="password"  className="border text-lg w-56 md:w-80 p-2 m-2 rounded-md" placeholder="Enter Password"/> */}
        <p className="text-red-900 font-bold text-lg">{error}</p>
        <button className="btn btn-primary rounded-md text-lg mt-5">Register</button>
        <Link href={"/"}>
        <p className='text-xl text-black mt-3'>login</p>
        </Link>
      </form>
    </main>
  );
}
