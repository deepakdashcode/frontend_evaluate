'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"; // Adjust the import path based on your ShadCN setup
import { Input } from "@/components/ui/input";   // Adjust the import path based on your ShadCN setup
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function CreateQuiz({ onCreate }) {
    const router = useRouter();
    const [questions, setQuestions] = useState(['']); // Starts with one empty question field
    const [title, setTitle] = useState('');
    const [userData, setUserData] = useState(null);
    const [quizId, setQuizId] = useState();


    useEffect(() => {
      const token = localStorage.getItem('access_token');
      console.log("Token From quiz Form:", token);
      if (!token) {
          toast.error('Please login first')
          return;
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
  }, []);
  
    const handleAddQuestion = () => {
    setQuestions([...questions, '']); // Adds a new empty question field
  };

  const handleChangeQuestion = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };
  const handleChangetitle = (value) => {
    setTitle(value);
  };
  const handleCreateQuiz = () => {
    const nonEmptyQuestions = questions.filter(question => question.trim() !== '');
    console.log("Title is ", title)
    console.log(nonEmptyQuestions);

    const token = localStorage.getItem('access_token')
    fetch(`http://localhost:8000/quiz/add?title=${title}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ...nonEmptyQuestions
      ])
    })
    .then(response => {
      const response_code = response.status;
      if(response_code == 200)
      {
        toast.success("Test created Successfully");
      }
      
      return response.json();
    } )
    .then(data => {
      console.log("Id is ", data.id)
      setQuizId(data.id);
      return console.log(data);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
        <Toaster/>
      <h2 className="text-xl font-semibold mb-4">Create a Quiz</h2>
      <Input 
        type="text"
        value={title}
        placeholder="Enter the title of the Quiz"
        onChange={(e) => handleChangetitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <Input
          key={index}
          type="text"
          value={question}
          placeholder={`Question ${index + 1}`}
          onChange={(e) => handleChangeQuestion(index, e.target.value)}
          className="mb-2 w-full max-w-md"
        />
      ))}

      <Button variant="outline" onClick={handleAddQuestion} className="w-10">
        +
      </Button>

      <Button variant="primary" onClick={handleCreateQuiz} className="mt-4">
        Create Quiz
      </Button>
      {
        quizId ? `Quiz id is ${quizId}`: ''
      }
    </div>
  );
}
