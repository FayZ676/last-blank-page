import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getCompletedPromptIds(userId: string) {
  try {
    const { data, error } = await supabase
      .from("completed_prompts")
      .select("prompt_id")
      .eq("user_id", userId);
    if (error) throw new Error(`${JSON.stringify(error)}`);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getOneCompletedPrompt(
  promptId: number,
  userId: string
): Promise<
  | {
      prompt_id: number;
    }
  | undefined
> {
  try {
    const { data, error } = await supabase
      .from("completed_prompts")
      .select("prompt_id")
      .eq("user_id", userId)
      .eq("prompt_id", promptId)
      .limit(1);
    if (error) throw new Error(`${JSON.stringify(error)}`);
    return data[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function setCompletedPrompt(promptId: number, feedback: "") {
  try {
    const { data, error } = await supabase
      .from("completed_prompts")
      .insert({ prompt_id: promptId, feedback: feedback });
    if (error) throw new Error(`${JSON.stringify(error)}`);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
