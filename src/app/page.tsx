'use client';
import React, {useState} from "react";
import {commentThread, Comment} from "@/mockData";
import styled from "styled-components";

// Things to Consider:
// Token Limit With Large Comment Thread
// Time to Create Response was Between 5.5s - 9s
// How many action items is too many? Can you prioritize?
// Added functionality for creating a meeting and providing that context

const SummaryContainer = styled.div`
  padding: 1rem;
  border: 1px solid;
`

const ActionItemsContainer = styled.div`
  padding: 1rem;
  border: 1px solid;
`

let extractedComments: any = []
function extractCommentMetaData() {
  commentThread.forEach((comment: Comment) => {
    extractedComments.push(`${comment.author} said ${comment.comment}`)
  })
}

extractCommentMetaData()

const context = "You are a product manager wanting a status update on the state of the product feature for a login page."

const prompt = `Given the context: ${context}, and the comments ${extractedComments}, generate two sections. One as a summary and the other to identify the action items based on the questions or @ mentions. Don't show unspecified action items.`

function Home() {
  const [summary, setSummary] = useState<string>('')
  const [actionItems, setActionItems] = useState<string[]>([])
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
    await extractSummaryAndActionItems(summary.choices[0].text)
    setLoading(false)
  }

  async function extractSummaryAndActionItems(text: string | undefined) {
    // Initialize variables
    let parsedSummary: string = ''
    let parsedActionItems: string[] = []

    if (text) {
      // Split the text into lines
      const lines = text.split('\n')

      // Extract the summary
      const summaryIndex = lines.indexOf('Summary:') + 2
      parsedSummary = lines[summaryIndex]

      // Extract the action items
      const actionItemsIndex = lines.indexOf('Action Items:')
      for (let i = actionItemsIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('-')) {
          parsedActionItems.push(line.substring(2))
        }
      }
      setSummary(parsedSummary)
      setActionItems(parsedActionItems)
    }

  }
  return (
    <main style={{display: "grid", gridGap: "1rem"}}>
      <h3>Comment Thread</h3>
      <div style={{padding: "1rem", border: "1px solid", maxHeight: "15rem", overflowY: "scroll"}}>
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
      </div>
      <button
        disabled={loading}
        type="button"
        style={{width: "fit-content"}}
        onClick={() => generateSummary()}>
        Create Summary
        </button>
      <div style={{display: "grid", gridGap: "1rem"}}>
        <h3>Summary</h3>
        <SummaryContainer>{summary}</SummaryContainer>
        <h3>Action Items</h3>
        <ActionItemsContainer>
          {actionItems.map((actionItem: string, index) => {
            return (
              <>
                <input id={index.toString()} type="checkbox" key={actionItem} value={actionItem} />
                <label htmlFor={index.toString()}>{actionItem}</label>
                <br/>
              </>
            )
          })}
        </ActionItemsContainer>
      </div>
    </main>
  )
}

export default Home
