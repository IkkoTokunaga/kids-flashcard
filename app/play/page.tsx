import { redirect } from "next/navigation";
import { GameClient } from "@/components/GameClient";
import { getDifficulty } from "@/lib/difficulty";

interface PageProps {
  searchParams: Promise<{ difficulty?: string }>;
}

export default async function PlayPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const difficulty = getDifficulty(params.difficulty ?? "");
  if (!difficulty) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col py-6">
      <GameClient difficulty={difficulty} />
    </main>
  );
}
