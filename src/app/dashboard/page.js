"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';

import { Card } from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

export default function Dashboard() {
    const [quizId, setQuizId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    // Function to handle form submit
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted ID:', quizId);
    };

    const handleQuizInputChange = (e) => {
        setQuizId(e.target.value); // Update the state with the current input value
      };


    const [userData, setUserData] = useState(null);
    
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log("Token:", token);
        if (!token) {
            toast.error('Please login first')
            return;
        }

        const fetchUserData = async () => {
            try {
                // const response = await fetch("http://localhost:8000/users/me/", {
                //     method: 'GET',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Authorization': `Bearer ${token}`
                //     }
                // });
                const response = await axios.get('http://localhost:8000/users/me/', {
                    headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  });


                  console.log('RESP DATA IS ', response.data);
                // if (!response.ok) {
                //     const errorDetails = await response.data;
                //     throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);
                // }
        
                const data = await response.data;
                console.log("User data:", data);
                setUserData(data)
            } catch (error) {
                console.log("Error fetching user data", error.message);
            }
        }
        fetchUserData();
    }, []);

    const handleAttemptQuiz = async (e)=>{
        e.preventDefault();
        
        const gotoRoute = `attemptQuiz/${quizId}`;
        console.log("NAVIGATING TO ", gotoRoute)
        navigateTo(gotoRoute);
    }
    
    return (
        <div>
            
            {userData ? (
                <div className="flex flex-col items-center gap-4 mt-10">
                    <Button variant="outline" onClick={() => {
                        navigateTo('/createQuiz')
                    }}>
                      Create Quiz
                    </Button>

                    <Drawer>
                        <DrawerTrigger className="p-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                                Attempt Quiz
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>You can only attempt the quiz once</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                            <div className="flex items-center justify-center bg-gray-100">

                                
                            <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                                <h2 className="text-2xl font-semibold mb-5 text-center">Attempt Quiz</h2>
                                <form className="space-y-5" onSubmit={handleAttemptQuiz}>
                                <Input  label="quizid" name="number" type="number"  onChange={handleQuizInputChange} value={quizId} required placeholder="Enter the Quiz ID" />
                                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Attempt</Button>
                                </form>
                                
                            </Card>
                            </div>
                            
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    
                    <Button variant="outline" onClick={() => console.log('Evaluate clicked')}>
                      Evaluate
                    </Button>

                    <Button variant="outline" onClick={() => console.log('Evaluate clicked')}>
                      Created Quizs
                    </Button>

                    <Button variant="outline" onClick={() => console.log('Evaluate clicked')}>
                      Attempted Quizs
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
        </div>
    );
}
