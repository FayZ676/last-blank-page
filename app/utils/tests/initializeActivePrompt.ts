"use server";

import {
  getOnePrompt,
  getRandomPrompt,
  updateActivePrompt,
  initializeData,
} from "./utils";

export async function initializeActivePromptForNewUser() {
  const user = await initializeData({
    id: "e3410205-b163-4fca-b624-c616a26990e9",
    progress: "in_progress",
    active_prompt: 1,
  });
  if (!user.active_prompt) {
    if (user.progress == "in_progress") {
      const prompt = await getRandomPrompt();
      await updateActivePrompt(prompt.id);
      return prompt;
    }
    return null;
  }
  const activePromptData = await getOnePrompt(user.active_prompt);
  return activePromptData;
}
