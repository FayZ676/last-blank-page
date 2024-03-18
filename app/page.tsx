import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Dashboard from "./components/Dashboard";
import { initializeActivePrompt } from "./utils/supabase/actions";

const supabase = createClient();

export default async function Home() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const initalActivePrompt = await initializeActivePrompt(data.user.id);

  return (
    <main className="flex flex-col gap-8">
      <Dashboard user={data.user} initialActivePrompt={initalActivePrompt} />
    </main>
  );
}
