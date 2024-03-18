"use client";

import React from "react";
import { initializeActivePromptForNewUser } from "./initializeActivePrompt";
import { completeAllPrompts } from "./completeAllPrompts";
import { clearDatabase } from "./clearDatabase";

export default function TestPage() {
  async function handleInitializeActivePromptForNewUser() {
    const newActivePrompt = await initializeActivePromptForNewUser();
    console.log(`NAP: ${JSON.stringify(newActivePrompt)}`);
  }

  async function handleCompleteAllPrompts() {
    const updatedUserData = await completeAllPrompts();
    console.log(`UUD: ${JSON.stringify(updatedUserData)}`);
  }

  async function handleClearDatabase() {
    await clearDatabase();
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleInitializeActivePromptForNewUser}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Initialize Active Prompt for New User
      </button>
      <button
        onClick={handleCompleteAllPrompts}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Complete all prompts
      </button>
    </div>
  );
}
