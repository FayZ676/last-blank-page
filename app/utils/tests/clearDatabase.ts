"use server";

import { deleteCompletedPrompts, deleteUser } from "./utils";

export async function clearDatabase() {
  await deleteCompletedPrompts();
  await deleteUser();
}
