"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function RegisterUser() {
  const [timestamp, setTimestamp] = useState(null);
  const [isClient, setIsClient] = useState(false);


  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  useEffect(() => {
    setIsClient(true);
    setTimestamp(Date.now());
  }, []);

  if (!isClient) return null;
  const handleRegister = async (e)=> {
    e.preventDefault();
    const username = (e.target.elements.username.value);
    const email = (e.target.elements.email.value);
    const password = (e.target.elements.password.value);
    try {
        const response = await axios.post("http://127.0.0.1:8000/user/add", null, {
            params: {
              username: username,
              email: email,
              password: password
            }
          });
      

        console.log('RESPONSE IS\n\n')
        if (response.request.status === 200){
            toast.success('User Registered Successfully')
        }

        // localStorage.setItem('access_token', response.data.access_token);
        console.log('INSIDE TRY');
        navigateTo('/login')
    } catch (err) {
        console.log("Error registering user:", err.response.status);
        toast.error('Email Already exists')
 
    }
    
  }
  const handleLogin = () => {
    toast.success('User Registered Successfully');
    navigateTo('/login');
  }
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster/>
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-5 text-center">Register</h2>
        <form className="space-y-5" onSubmit={handleRegister}>
          <Input label="Username" name="username" type="text" required placeholder="Enter your username" />
          <Input label="Email" name="email" type="email" required placeholder="Enter your email" />
          <Input label="Password" name="password" type="password" required placeholder="Enter your password" />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Sign Up</Button>
        </form>
        <Button onClick={handleLogin} className="w-full my-2 bg-blue-100 hover:bg-gray-200 text-blue-700">Already a user? Login</Button>
      </Card>
    </div>
  );
}
