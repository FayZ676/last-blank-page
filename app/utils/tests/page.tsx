"use client";

import React from "react";
import { initializeActivePromptForNewUser } from "./initializeActivePrompt";
import { completeFirstPrompt, completeLastPrompt } from "./completePrompts";

export default function TestPage() {
  async function handleInitializeActivePromptForNewUser() {
    const newActivePrompt = await initializeActivePromptForNewUser();
    console.log(`NAP: ${JSON.stringify(newActivePrompt)}`);
  }

  async function handlecompleteLastPrompt() {
    const updatedUserData = await completeLastPrompt();
    console.log(`UUD: ${JSON.stringify(updatedUserData)}`);
  }

  async function handlecompleteFirstPrompt() {
    const updatedUserData = await completeFirstPrompt();
    console.log(`UUD: ${JSON.stringify(updatedUserData)}`);
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
        onClick={handlecompleteLastPrompt}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Complete last prompt
      </button>
      <button
        onClick={handlecompleteLastPrompt}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Complete first prompt
      </button>
    </div>
  );
}
