'use client';
import { Button } from "@/components/ui/button"

import { Toaster } from "react-hot-toast";
import Login from "./login/page";
import Dashboard from "./dashboard/page";
import RegisterUser from "./register/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (

      <div className="bg-gray-800">
        <Toaster/>
        <RegisterUser/>
      </div>

    
  );
}
