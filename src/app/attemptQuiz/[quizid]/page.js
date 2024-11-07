'use client';
import QuizForm from "@/components/myComponents/QuizForm";
import axios from "axios";

import  { use, useEffect, useState } from "react";



const AttemptQuiz =  ( { params } )=> {
    const { quizid } = use(params);
    const [questions, setQuestions] = useState([])
    const [userData, setUserData] = useState(null);


    const getQuestions = async (quizid) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/quiz/${quizid}`);
            const data = response.data; // Assuming the response is an array
            setQuestions(data);
          } catch (error) {
            console.log('There was an error fetching the quiz data:', error);
          }
    }

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
        
                const data = await response.data;
                console.log("User data:", data);
                setUserData(data)
            } catch (error) {
                console.error("Error fetching user data", error.message);
            }
        }
        fetchUserData();
        getQuestions(quizid);
    }, []);



    return (
        <div>
            
            {
            <QuizForm questions={questions} quiz_id={quizid}/>
            }
        </div>
    )
}

export default AttemptQuiz;