import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getActivePromptId(userId: string): Promise<
  | {
      active_prompt: number;
    }
  | undefined
> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("active_prompt")
      .eq("id", userId)
      .limit(1);
    console.log(`APIdD: ${JSON.stringify(data)}`);
    if (error) throw new Error(`${JSON.stringify(error)}`);
    return data[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function setActivePrompt(promptId: number) {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert({ active_prompt: promptId })
      .select();
    if (error) throw new Error(`${JSON.stringify(error)}`);
    return data[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
}
