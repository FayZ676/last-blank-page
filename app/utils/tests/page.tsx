"use client";

import React, { useState } from "react";
import { initializeExistingUser, initializeNewUser } from "./initializePrompt";
import { completeNullPrompt, completeLastPrompt } from "./completePrompt";
import Button from "@/app/components/Button";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  async function handleTest(testFunction: () => Promise<any>) {
    setLoading(true);
    setTestResult("");
    const result = await testFunction();
    setTestResult(JSON.stringify(result));
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-4">
        <h1>Tests</h1>
        <div className="grid gap-4">
          <div className="grid">
            <div className="flex justify-between">
              <h2>Initialize New User</h2>
              <Button
                text="Run"
                onClickHandler={() => handleTest(initializeNewUser)}
              />
            </div>
            <ul>
              <li>
                <b>progress:</b> in_progress
              </li>
              <li>
                <b>active_prompt:</b> null
              </li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between">
              <h2>Initialize Existing User</h2>
              <Button
                text="Run"
                onClickHandler={() => handleTest(initializeExistingUser)}
              />
            </div>
            <p>test description</p>
          </div>
          <div>
            <div className="flex justify-between">
              <h2>Complete Last Prompt</h2>
              <Button
                text="Run"
                onClickHandler={() => handleTest(completeLastPrompt)}
              />
            </div>
            <p>test description</p>
          </div>
          <div>
            <div className="flex justify-between">
              <h2>Complete Empty Prompt</h2>
              <Button
                text="Run"
                onClickHandler={() => handleTest(completeNullPrompt)}
              />
            </div>
            <p>test description</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex space-x-2">
          <h1>Result</h1>
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </div>
        <p>{testResult && testResult}</p>
      </div>
    </div>
  );
}
