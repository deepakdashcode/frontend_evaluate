"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log("Token:", token);
        if (!token) {
            toast.error('Please login first')
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8000/users/me/", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);
                }
        
                const data = await response.json();
                console.log("User data:", data);
                setUserData(data)
            } catch (error) {
                console.error("Error fetching user data", error.message);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {userData ? (
                <div>
                    <p>Email: {userData.email}</p>
                    <p>Username: {userData.username}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
