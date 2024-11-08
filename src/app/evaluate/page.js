'use client';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
export default function page() {
    const [userData, setUserData] = useState(null);
    const [quizes, setQuizes] = useState([]);
    const [evalId, setEvalId] = useState();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log("Token From quiz Form:", token);
        if (!token) {
            toast.error('Please login first')
            return;
        }
        const getCreatedQuizes = async()=>{
            try {
                const response = await axios.get('http://localhost:8000/users/created/', {
                    headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  });
        
    
        
                const data = await response.data;
                // setUserData(data);
                // console.log("User data:", data);
                return data;
                
            } catch (error) {
                console.error("Error fetching user data", error.message);
                return ["Error"]
            }
        }    
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/me/', {
                    headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  });
        
    
        
                const data = await response.data;
                setUserData(data);
                console.log("User data:", data);
                
            } catch (error) {
                console.error("Error fetching user data", error.message);
            }
        }
        fetchUserData();
        setQuizes(getCreatedQuizes());
    }, []);
    const handleChangeEvalId = (value) => {
        setEvalId(value);
      };

    const handleEvaluate = () => {
        const token = localStorage.getItem('access_token')
    fetch(`http://localhost:8000/quiz/evaluate/${evalId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      const response_code = response.status;
      if(response_code != 200)
      {
        toast.error("Some Error Occurred");
      }
      
      return response.json();
    } )
    .then(data => {
      
      if (!data.detail){
        toast.success("Quiz Evaluated Successfully");
      }
      return console.log(data);
    })
    .catch(error => console.error('Error:', error));
  

    }
    return (
        
        <div className="flex m-5 items-center justify-center h-screen bg-gray-100">
            <Toaster/>
            <div className="bg-white m-5 p-8 rounded-lg shadow-lg max-w-md w-full text-center">

            
            <h1>Attempted Quiz Ids are: </h1>
            {quizes}

            <Input 
            type="number"
            placeholder='Enter Quiz Id to evaluate'
            value={evalId}
            onChange={(e)=>handleChangeEvalId(e.target.value)}
            />
            <Button className='m-2' onClick={handleEvaluate}>Evaluate</Button>
            </div>
        </div>
        
        
    );
}
