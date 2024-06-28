"use client"
import Link from "next/link";
import { useRouter ,useSearchParams} from "next/navigation";
import { MdLogout } from "react-icons/md";


export default function Headers() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const router = useRouter();
  const NavLinks = [
    {
      href : `/home?userId=${userId}`,
      label : "Home"
    },
    {
      href : `/notes?userId=${userId}`,
      label: "Notes"
    },

  ]
  return (
    <nav className="h-20 flex justify-between md:m-5 m-2 items-center">
       <div className="text-2xl ">Note App</div>
       <ul className="flex justify-between items-center text-lg md:text-xl">
        {NavLinks.map((link) =>(
          <li key={link.href} className="md:p-5 p-2">
            <Link href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
        <li><button onClick={()=>{router.replace("/")}} className="text-2xl p-2 md:text-4xl"><MdLogout /></button></li>
       </ul>
    </nav>
  )
}
