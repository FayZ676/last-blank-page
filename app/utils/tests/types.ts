type userDetails = {
  id: string;
  progress: "complete" | "in_progress";
  activePrompt: number | null;
};

type createUserProps = {
  progress: "complete" | "in_progress";
  activePrompt: number | null;
};

type insertCompletedPromptProps = {
  promptId: number;
  userId: string;
  feedback: string;
};

type initializeDataProps = {
  progress: "complete" | "in_progress";
  activePrompt: number | null;
};
