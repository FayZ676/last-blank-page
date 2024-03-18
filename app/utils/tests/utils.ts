import { createClient } from "@/utils/supabase/server";
import { clearDatabase } from "./clearDatabase";
import { Database } from "@/types";

const supabase = createClient();

// USERS_TEST TABLE
export async function insertUser({ progress, activePrompt }: createUserProps) {
  const { data, error } = await supabase
    .from("users_test")
    .insert({
      id: "e3410205-b163-4fca-b624-c616a26990e9",
      progress: progress,
      active_prompt: activePrompt,
    })
    .select();
  if (error) throw new Error(`${JSON.stringify(error)}`);
}

export async function getUser() {
  const { data, error } = await supabase
    .from("users_test")
    .select("*")
    .eq("id", "e3410205-b163-4fca-b624-c616a26990e9")
    .limit(1);
  if (error) throw new Error(`${JSON.stringify(error)}`);
  return data[0];
}

export async function updateUser({
  id,
  progress,
  active_prompt,
}: Database["public"]["Tables"]["users_test"]["Row"]) {
  await supabase
    .from("users_test")
    .update({ active_prompt: active_prompt, progress: progress })
    .eq("id", id);
}

export async function updateActivePrompt(
  prompt_id: Database["public"]["Tables"]["users_test"]["Row"]["active_prompt"]
) {
  const { data, error } = await supabase
    .from("users_test")
    .update({ active_prompt: prompt_id })
    .eq("id", "e3410205-b163-4fca-b624-c616a26990e9");
  if (error) throw new Error(`${JSON.stringify(error)}`);
}

export async function deleteUser() {
  const { error } = await supabase
    .from("users_test")
    .delete()
    .eq("id", "e3410205-b163-4fca-b624-c616a26990e9");
  if (error) throw new Error(`${JSON.stringify(error)}`);
}

// PROMPTS_TEST TABLE
async function insertPrompt(
  prompt: Database["public"]["Tables"]["prompts_test"]["Row"]
) {
  const { data, error } = await supabase
    .from("prompts_test")
    .insert(prompt)
    .select();
  if (error) throw new Error(`${JSON.stringify(error)}`);
}

export async function getOnePrompt(
  id: Database["public"]["Tables"]["prompts_test"]["Row"]["id"]
) {
  const { data, error } = await supabase
    .from("prompts_test")
    .select("*")
    .eq("id", id)
    .limit(1);
  if (error) throw new Error(`${JSON.stringify(error)}`);
  return data[0];
}

export async function getRandomPrompt() {
  const { data, error } = await supabase
    .from("prompts_test")
    .select("*")
    .limit(1);
  if (error) throw new Error(`${JSON.stringify(error)}`);
  return data[0];
}

export async function getUniquePrompt(completedPrompts: string) {
  const { data, error } = await supabase
    .from("prompts_test")
    .select("*")
    .not("id", "in", completedPrompts)
    .limit(1);
  if (error) throw new Error(`${JSON.stringify(error)}`);
  return data[0];
}

// COMPLETED PROMPTS TABLE
export async function insertCompletedPrompt({
  promptId,
  userId,
  feedback,
}: insertCompletedPromptProps) {
  const { data, error } = await supabase.from("completed_prompts_test").insert({
    feedback: feedback,
    prompt_id: promptId,
    user_id: userId,
  });
  if (error) throw new Error(`${JSON.stringify(error)}`);
}

export async function getCompletedPrompts(userId: string) {
  const { data, error } = await supabase
    .from("completed_prompts_test")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(`${JSON.stringify(error)}`);
  return data;
}

export async function deleteCompletedPrompts() {
  const { error } = await supabase
    .from("completed_prompts_test")
    .delete()
    .eq("user_id", "e3410205-b163-4fca-b624-c616a26990e9");
  if (error) throw new Error(`${JSON.stringify(error)}`);
}

// UTILITIES
export async function initializeData(
  user: Database["public"]["Tables"]["users_test"]["Row"],
  completedPrompts?: {
    completedPrompt: Database["public"]["Tables"]["completed_prompts_test"]["Row"];
    feedback: string;
  }[],
  prompts?: Database["public"]["Tables"]["prompts_test"]["Row"][]
) {
  await clearDatabase();
  await insertUser({
    progress: user.progress,
    activePrompt: user.active_prompt,
  });
  prompts && (await Promise.all(prompts.map((prompt) => insertPrompt(prompt))));
  completedPrompts &&
    (await Promise.all(
      completedPrompts.map((completed) =>
        insertCompletedPrompt({
          promptId: completed.completedPrompt.prompt_id,
          userId: completed.completedPrompt.user_id,
          feedback: completed.feedback,
        })
      )
    ));
  return user;
}
