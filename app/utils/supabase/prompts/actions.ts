import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getNewPrompt(completedPrompts: number[]) {
  try {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .not("id", "in", `(${completedPrompts.join(",")})`)
      .limit(1);
    if (error) throw new Error(`${JSON.stringify(error)}`);
    return data[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getOnePrompt(promptId: number) {
  try {
    const { data, error } = await supabase
      .from("prompts")
      .select()
      .eq("id", promptId)
      .limit(1);
    if (error) throw new Error(`${JSON.stringify(error)}`);
    return data[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
}
