"use client";

import Image from "next/image";
import { type Card, getCardImagePath } from "@/lib/cards";

interface Props {
  card: Card;
  revealed: boolean;
  onReveal: () => void;
}

export function FlashCard({ card, revealed, onReveal }: Props) {
  return (
    <button
      type="button"
      onClick={onReveal}
      aria-pressed={revealed}
      aria-label={revealed ? `こたえ: ${card.name}` : "えをタップしてこたえる"}
      className={[
        "relative flex aspect-square w-full max-w-[22rem] select-none flex-col items-center justify-center",
        "rounded-[2rem] bg-white shadow-xl shadow-orange-200/60",
        "ring-4 ring-orange-200",
        "transition-transform active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-orange-400",
      ].join(" ")}
    >
      <div className="flex h-full w-full items-center justify-center p-6">
        <Image
          src={getCardImagePath(card)}
          alt=""
          width={256}
          height={256}
          priority
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>

      {revealed && (
        <div
          className="absolute inset-x-4 bottom-4 rounded-2xl bg-orange-500/95 px-4 py-3 text-center text-3xl font-extrabold tracking-wider text-white shadow-lg sm:text-4xl"
          aria-live="polite"
        >
          {card.name}
        </div>
      )}
    </button>
  );
}
