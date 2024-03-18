"use server";

import { getActivePromptId, setActivePrompt } from "./users/actions";
import { getNewPrompt, getOnePrompt } from "./prompts/actions";
import {
  getCompletedPromptIds,
  getOneCompletedPrompt,
  setCompletedPrompt,
} from "./completed_prompts/actions";
import { Tables } from "@/types";

export async function initializeActivePrompt(userId: string) {
  console.log(`UId: ${JSON.stringify(userId)}`);
  const activePromptId = await getActivePromptId(userId);
  console.log(`APId: ${JSON.stringify(activePromptId)}`);
  if (!activePromptId) {
    const completedPrompts = await getCompletedPromptIds(userId);
    const newActivePromptData = await getNewPrompt(
      completedPrompts.map((prompt) => prompt.prompt_id)
    );
    await setActivePrompt(newActivePromptData.id);
    return newActivePromptData;
  }
  const completedActivePrompt = await getOneCompletedPrompt(
    activePromptId.active_prompt,
    userId
  );
  if (!completedActivePrompt) {
    return null;
  }
  const activePromptData = await getOnePrompt(activePromptId.active_prompt);
  return activePromptData;
}

export async function handleUpdateActivePrompt(
  currentActivePrompt: Tables<"prompts">
) {
  console.log(`CAP: ${JSON.stringify(currentActivePrompt)}`);
  await setCompletedPrompt(currentActivePrompt.id, "");
}
