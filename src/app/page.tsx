'use client';
import React, {useState} from "react";
import {commentThread, Comment} from "@/mockData";

const prompt = `Take the JSON response ${JSON.stringify(commentThread)} and generate a summary.`
// TODO: For training
const completion = '';

function Home() {
  const [answer, setAnswer] = useState(undefined)
  const [loading, setLoading] = useState(false)
  async function generateSummary() {
    setLoading(true)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const summary = await response.json()
    setAnswer(summary.choices[0].text)
    setLoading(false)
  }
  return (
    <main>
      {commentThread.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            {comment.service}
            <div>{comment.comment}</div>
            <div>{comment.author}</div>
            <div>{comment.created_at}</div>
            <hr/>
          </div>
        )
      })}
      <button
        disabled={loading}
        type="button"
        onClick={() => generateSummary()}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
        Create Summary
        </button>
      <div>{answer}</div>
    </main>
  )
}

export default Home