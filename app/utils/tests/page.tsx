"use client";

import React, { useState } from "react";
import { initializeExistingUser, initializeNewUser } from "./initializePrompt";
import { completeNullPrompt, completeLastPrompt } from "./completePrompt";
import TestCard from "./components/TestCard";

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
          <TestCard
            onClickHandler={() => handleTest(initializeNewUser)}
            title="Initialize New User"
            description="Some test description"
          />
          <TestCard
            onClickHandler={() => handleTest(initializeExistingUser)}
            title="Initialize Existing User"
            description="Some test description"
          />
          <TestCard
            onClickHandler={() => handleTest(completeLastPrompt)}
            title="Complete the Last Prompt"
            description="Some test description"
          />
          <TestCard
            onClickHandler={() => handleTest(completeNullPrompt)}
            title="Complete an Empty Prompt"
            description="Some test description"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex space-x-2">
          <h1>Result</h1>
          {loading && <p>loading ...</p>}
        </div>
        <p>{testResult && testResult}</p>
      </div>
    </div>
  );
}
