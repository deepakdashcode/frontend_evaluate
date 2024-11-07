'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Adjust the import path based on your ShadCN setup
import { Input } from "@/components/ui/input";   // Adjust the import path based on your ShadCN setup
import { useRouter } from 'next/navigation';

export default function CreateQuiz({ onCreate }) {
    const router = useRouter();
    const [questions, setQuestions] = useState(['']); // Starts with one empty question field
    const handleAddQuestion = () => {
    setQuestions([...questions, '']); // Adds a new empty question field
  };

  const handleChangeQuestion = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = () => {
    const nonEmptyQuestions = questions.filter(question => question.trim() !== '');
    console.log(nonEmptyQuestions);
    
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
        
      <h2 className="text-xl font-semibold mb-4">Create a Quiz</h2>

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
    </div>
  );
}
