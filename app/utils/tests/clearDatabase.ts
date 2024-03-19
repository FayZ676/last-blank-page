"use server";

import {
  deleteCompletedPrompts,
  deletePrompts,
  deleteUser,
  getAllPrompts,
} from "./utils";

export async function clearDatabase() {
  await deleteCompletedPrompts("e3410205-b163-4fca-b624-c616a26990e9");
  await deleteUser("e3410205-b163-4fca-b624-c616a26990e9");
  const prompts = await getAllPrompts();
  await deletePrompts(prompts.map((prompt) => prompt.id));
}
