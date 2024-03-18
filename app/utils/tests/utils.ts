import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

type createUserProps = {
  progress: "complete" | "in_progress";
  activePrompt: number;
};

type updateUserProps = {
  userId: string;
  progress: "complete" | "in_progress";
  activePrompt: number | null;
};

type getPromptProps = {
  id: number;
};

type updateActivePromptProps = {
  prompt_id: number;
};

type insertCompletedPromptProps = {
  promptId: number;
  userId: string;
  feedback: string;
};

type getCompletedPromptsProps = {
  userId: string;
};
type getUniquePromptProps = {
  completedPrompts: string;
};

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
  userId,
  progress,
  activePrompt,
}: updateUserProps) {
  await supabase
    .from("users_test")
    .update({ active_prompt: activePrompt, progress: progress })
    .eq("id", userId);
}

export async function updateActivePrompt({
  prompt_id,
}: updateActivePromptProps) {
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
export async function getOnePrompt({ id }: getPromptProps) {
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

export async function getUniquePrompt({
  completedPrompts,
}: getUniquePromptProps) {
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

export async function getCompletedPrompts({
  userId,
}: getCompletedPromptsProps) {
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
