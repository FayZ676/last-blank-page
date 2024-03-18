"use client";

import { User } from "@supabase/supabase-js";
import React, { useState } from "react";

import { Tables } from "@/types";
import { handleUpdateActivePrompt } from "../utils/supabase/actions";

interface DashboardProps {
  user: User;
  initialActivePrompt: Tables<"prompts"> | null;
}

export default function Dashboard({
  user,
  initialActivePrompt,
}: DashboardProps) {
  const [loading, setLoading] = useState(false);
  const [activePrompt, setActivePrompt] = useState<Tables<"prompts"> | null>(
    initialActivePrompt
  );

  async function handleNewPrompt() {
    const newPrompt = await handleUpdateActivePrompt(activePrompt);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>The Last Blank Page</h1>
        <strong>{user.email}</strong>
      </div>
      <div className="flex flex-col gap-2">
        {activePrompt ? (
          <p>{activePrompt.scene}</p>
        ) : (
          <p>All prompts completed</p>
        )}
        {activePrompt && (
          <button
            onClick={handleNewPrompt}
            disabled={loading}
            className="border mr-auto p-1"
          >
            New Prompt
          </button>
        )}
      </div>
    </div>
  );
}
