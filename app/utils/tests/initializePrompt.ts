"use server";

import { Database } from "@/types";
import {
  getOnePrompt,
  getRandomPrompt,
  updateActivePrompt,
  initializeData,
  getUser,
} from "./utils";

async function initializePrompt(
  user: Database["public"]["Tables"]["users_test"]["Row"]
) {
  if (!user.active_prompt) {
    if (user.progress == "in_progress") {
      const prompt = await getRandomPrompt();
      await updateActivePrompt(prompt.id);
      const updatedUser = await getUser();
      return updatedUser;
    }
    return user;
  }
  const activePromptData = await getOnePrompt(user.active_prompt);
  return activePromptData;
}

export async function initializeNewUser() {
  const user = await initializeData(
    {
      id: "e3410205-b163-4fca-b624-c616a26990e9",
      progress: "in_progress",
      active_prompt: null,
    },
    undefined,
    [{ id: 1, scene: "First scene", task: "First task" }]
  );
  const updatedUser = await initializePrompt(user);
  return updatedUser;
}

export async function initializeExistingUser() {
  const user = await initializeData(
    {
      id: "e3410205-b163-4fca-b624-c616a26990e9",
      progress: "in_progress",
      active_prompt: 1,
    },
    undefined,
    [{ id: 1, scene: "First scene", task: "First task" }]
  );
  const updatedUser = await initializePrompt(user);
  return updatedUser;
}
