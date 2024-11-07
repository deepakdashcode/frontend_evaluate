import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
export default function QuizForm({ questions = [], quiz_id }) {
    const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const handleChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };


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
    
            // if (!response.ok) {
            //     const errorDetails = await response.data;
            //     throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);
            // }
    
            const data = await response.data;
            setUserData(data);
            console.log("User data:", data);
            
        } catch (error) {
            console.error("Error fetching user data", error.message);
        }
    }
    fetchUserData();
}, []);


const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    console.log('Answers:', answers);
    console.log(userData);
    console.log("Quiz id is ", quiz_id)
    console.log('Token is ', token)
    fetch(`http://localhost:8000/quiz/attempt?quiz_id=${quiz_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ...answers
        ])
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    // toast.success("Answer submitted successfully you can now close this tab")
  };
  return (
    <div className="space-y-6 max-w-xl mx-auto">
        <Toaster/>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {questions.map((question, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle>Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{question}</p>
              <Textarea
                required
                rows={4}
                value={answers[index] || ''}
                onChange={(event) => handleChange(index, event)}
                placeholder={`Your answer for question ${index + 1}`}
                className="w-full"
              />
            </CardContent>
          </Card>
        ))}
        <CardFooter className="text-center">
          <Button size="lg" variant="primary" className="mt-4 w-full">
            Submit Answers
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
