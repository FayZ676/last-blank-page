"use client";

import React from "react";
import {
  initializePromptForExistingUser,
  initializePromptForNewUser,
} from "./initializePrompt";
import { completeNullPrompt, completeLastPrompt } from "./completePrompt";

export default function TestPage() {
  async function handleInitializePromptForNewUser() {
    const newActivePrompt = await initializePromptForNewUser();
    console.log(`NAP: ${JSON.stringify(newActivePrompt)}`);
  }

  async function handleInitializePromptForExistingUser() {
    const newActivePrompt = await initializePromptForExistingUser();
    console.log(`NAP: ${JSON.stringify(newActivePrompt)}`);
  }

  async function handlecompleteLastPrompt() {
    const updatedUserData = await completeLastPrompt();
    console.log(`UUD: ${JSON.stringify(updatedUserData)}`);
  }

  async function handlecompleteNullPrompt() {
    const updatedUserData = await completeNullPrompt();
    console.log(`UUD: ${JSON.stringify(updatedUserData)}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleInitializePromptForNewUser}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Initialize active prompt for new user
      </button>
      <button
        onClick={handleInitializePromptForExistingUser}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Initialize active prompt for existing user
      </button>
      <button
        onClick={handlecompleteLastPrompt}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Complete last prompt
      </button>
      <button
        onClick={handlecompleteNullPrompt}
        className="border rounded-md p-2 hover:bg-stone-800"
      >
        Complete first prompt
      </button>
    </div>
  );
}
