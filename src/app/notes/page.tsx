"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Data {
  _id: string;
  title: string;
  description: string;
}
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [datas, setDatas] = useState<Data[]>([]);
  
  useEffect(() => {
    const userId = searchParams.get('userId')
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/notes?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data :Data[] = await response.json();
        setDatas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, []);
    const deleteData = async (_Id:any) => {
      const userId = searchParams.get('userId')
      try {
        const response = await fetch(`http://localhost:3000/api/notes?userId=${userId}&noteId=${_Id}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            
          })}

        )
        if(response.status==200){
          // alert("Succesfully Deleted") 
          location.reload()
        }
        
      } catch (error:any) {
        return console.log(error.message)
      }
  }
  return (
    <main className="flex flex-col items-center justify-center p-16 md:p-24">
      <h1 className="text-3xl">Your Notes</h1>    
      <div className="md:m-10 flex-wrap flex w-full md:text-xl text-lg">
          {datas.map((item) => (
            <div key={item._id}>
              <div className="md:w-52 w-40 h-40 border md:h-80 flex  justify-between flex-col text-wrap overflow-hidden m-5">
                <div className="flex flex-col h-max-70 overflow-auto">
              <div className="p-2 break-all"> <p className="font-bold">Title:</p> {item.title}</div>
              <div className="p-2 break-all"> <p className="font-bold">Description:</p> {item.description}</div>
                  </div> 
              <button onClick={()=>{deleteData(item._id)}} className="md:w-52 w-40 p-2 border-t h-5 md:h-10 flex justify-center items-center btn btn-primary rounded-none ">Delete</button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
