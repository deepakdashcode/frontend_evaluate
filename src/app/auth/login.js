"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import toast from "react-hot-toast";
export default function Login() {
  const [timestamp, setTimestamp] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimestamp(Date.now());
  }, []);

  if (!isClient) return null;
  const handleRegister = async (e)=> {
    e.preventDefault();
    const email = (e.target.elements.email.value);
    const password = (e.target.elements.password.value);
    try {
        const form = new FormData();
        form.append("username", email);
        form.append("password", password);

      const response = await axios.post("http://127.0.0.1:8000/login", form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      

        console.log('RESPONSE IS\n\n')
        if (response.request.status === 200){
            toast.success('User Logged in Successfully')
        }

        localStorage.setItem('access_token', response.data.access_token);
        console.log('INSIDE TRY');
        
    } catch (err) {
        console.log("Error registering user:", err.response);
        toast.error('Invalid Credentials')
 
    }
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleRegister}>
          <Input label="Email" name="email" type="email" required placeholder="Enter your email" />
          <Input label="Password" name="password" type="password" required placeholder="Enter your password" />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Login</Button>
        </form>
      </Card>
    </div>
  );
}
