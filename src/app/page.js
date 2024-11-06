import { Button } from "@/components/ui/button"
import { Register } from "./auth/register";
import { Toaster } from "react-hot-toast";
import Login from "./auth/login";
import Dashboard from "./auth/dashboard";
export default function Home() {
  return (
    <>
    <Toaster/>
    {/* <Register/>   */}
    {/* <Login/> */}

    <Dashboard/>
    </>
    
  );
}
