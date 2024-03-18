"use server";

import { clearDatabase } from "./clearDatabase";
import {
  insertUser,
  getCompletedPrompts,
  getUniquePrompt,
  getUser,
  insertCompletedPrompt,
  updateUser,
} from "./utils";

async function initializeData() {
  await clearDatabase();
  await insertUser({ progress: "in_progress", activePrompt: 1 });
  const user = await getUser();
  return user;
}

export async function completeAllPrompts() {
  const user = await initializeData();
  if (!user.active_prompt) throw new Error("No active prompt for user");
  await insertCompletedPrompt({
    promptId: user.active_prompt,
    userId: user.id,
    feedback: "",
  });
  const completedPrompts = await getCompletedPrompts({ userId: user.id });
  const newPrompt = await getUniquePrompt({
    completedPrompts: `(${completedPrompts
      .map((prompt) => prompt.prompt_id)
      .join(",")})`,
  });

  if (!newPrompt) {
    await updateUser({
      userId: user.id,
      activePrompt: null,
      progress: "complete",
    });
  } else {
    await updateUser({
      userId: user.id,
      activePrompt: newPrompt.id,
      progress: "in_progress",
    });
  }

  const updatedUser = await getUser();
  return updatedUser;
}
