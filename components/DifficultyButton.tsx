import Link from "next/link";
import type { Difficulty } from "@/lib/difficulty";

interface Props {
  difficulty: Difficulty;
}

export function DifficultyButton({ difficulty }: Props) {
  return (
    <Link
      href={{ pathname: "/play", query: { difficulty: difficulty.id } }}
      className={[
        "flex w-full flex-col items-center justify-center gap-2",
        "rounded-3xl px-6 py-8 text-white shadow-lg shadow-black/10",
        "text-2xl font-bold tracking-wide",
        "transition-transform active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
        difficulty.colorClass,
      ].join(" ")}
      aria-label={`${difficulty.label}でスタート`}
    >
      <span className="text-3xl">{difficulty.label}</span>
      <span className="text-base font-medium opacity-90">
        {difficulty.description}
      </span>
    </Link>
  );
}
