'use client';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function page() {
    const [userData, setUserData] = useState(null);
    const [quizes, setQuizes] = useState([]);
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


    return (
        
        <div className="flex flex-row min-h-screen justify-center items-center">
            <h1>Attempted Quiz Ids are: </h1>
            {quizes}
        </div>
        
        
    );
}
