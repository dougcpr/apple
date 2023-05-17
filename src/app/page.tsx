'use client';
import React, {useState} from "react";

type Comment = {
  id: number;
  service: Service;
  comment: string;
  title: string;
  author: string;
  created_at: string;
}

enum Service {
  Notion = "Notion",
  Linear = "Linear"
}

const commentThread: Comment[] = [
  {
    id: 1,
    service: Service.Notion,
    comment: 'This is a good idea.',
    title: 'Bug Report Product Requirements',
    author: 'Doug Cooper',
    created_at: '1684191855'
  }, {
    id: 2,
    service: Service.Notion,
    comment: 'I agree. I like this feature.',
    title: 'Bug Report Product Requirements',
    author: 'Stormy Adams',
    created_at: '1684191870'
  }, {
    id: 3,
    service: Service.Linear,
    comment: '@doug Could you work on this thing? It is a high priority.',
    title: 'Create the inputs for the bug report.',
    author: 'Stormy Adams',
    created_at: '1684191885'
  }, {
    id: 4,
    service: Service.Linear,
    comment: '@elliot For clarity, what email address is the bug report being sent to?',
    title: 'Create the inputs for the bug report.',
    author: 'Stormy Adams',
    created_at: '1684191890'
  }, {
    id: 5,
    service: Service.Linear,
    comment: '@doug when can we start this feature?',
    title: 'Create the inputs for the bug report.',
    author: 'Stormy Adams',
    created_at: '1684191895'
  }, {
    id: 6,
    service: Service.Linear,
    comment: '@stormy we can start this tuesday!!',
    title: 'Create the inputs for the bug report.',
    author: 'Doug',
    created_at: '1684191900'
  }
]

const prompt = `Take the JSON response ${JSON.stringify(commentThread)} and generate a summary.`

function Home() {
  const [answer, setAnswer] = useState(undefined)
  const [loading, setLoading] = useState(false)
  async function generateSummary() {
    setLoading(true)
    console.log('completing text')
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
    let temp = await response.json()
    setAnswer(temp.choices[0].text)
    setLoading(false)
  }
  return (
    <main>
      {commentThread.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            <div>{comment.id}: {comment.comment}</div>
            <div>{comment.service} {comment.author}</div>
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