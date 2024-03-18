"use server";

import { clearDatabase } from "./clearDatabase";
import {
  insertUser,
  getOnePrompt,
  getRandomPrompt,
  getUser,
  updateActivePrompt,
} from "./utils";

async function initializeData() {
  await clearDatabase();
  await insertUser({ progress: "in_progress", activePrompt: 1 });
  const user = await getUser();
  return user;
}

export async function initializeActivePromptForNewUser() {
  const user = await initializeData();
  if (!user.active_prompt) {
    if (user.progress == "in_progress") {
      const prompt = await getRandomPrompt();
      await updateActivePrompt({ prompt_id: prompt.id });
      return prompt;
    }
    return null;
  }
  const activePromptData = await getOnePrompt({ id: user.active_prompt });
  return activePromptData;
}
