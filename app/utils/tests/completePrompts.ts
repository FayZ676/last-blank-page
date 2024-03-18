"use server";

import { Database } from "@/types";
import {
  getCompletedPrompts,
  getUniquePrompt,
  getUser,
  insertCompletedPrompt,
  updateUser,
  initializeData,
} from "./utils";

async function completePrompt(
  user: Database["public"]["Tables"]["users_test"]["Row"]
) {
  if (!user.active_prompt) throw new Error("No active prompt for user");
  await insertCompletedPrompt({
    promptId: user.active_prompt,
    userId: user.id,
    feedback: "",
  });
  const completedPrompts = await getCompletedPrompts(user.id);
  const newPrompt = await getUniquePrompt(
    `(${completedPrompts.map((prompt) => prompt.prompt_id).join(",")})`
  );

  if (!newPrompt) {
    await updateUser({
      id: user.id,
      active_prompt: null,
      progress: "complete",
    });
  } else {
    await updateUser({
      id: user.id,
      active_prompt: newPrompt.id,
      progress: "in_progress",
    });
  }
  const updatedUser = await getUser();
  return updatedUser;
}

export async function completeLastPrompt() {
  const user = await initializeData({
    id: "e3410205-b163-4fca-b624-c616a26990e9",
    active_prompt: 1,
    progress: "in_progress",
  });
  const updatedUser = await completePrompt(user);
  return updatedUser;
}
