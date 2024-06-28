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
  const userId = searchParams.get('userId')
  const [datas, setDatas] = useState<Data[]>([]);

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>Hello</h1>
    </main>
  );
}
