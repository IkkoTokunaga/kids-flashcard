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
        "group relative aspect-square w-full max-w-[22rem] select-none [perspective:1200px]",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-orange-400",
      ].join(" ")}
    >
      <div
        className={[
          "relative h-full w-full rounded-[2rem] ring-4 ring-orange-200",
          "shadow-xl shadow-orange-200/60 transition-transform duration-500",
          "active:scale-[0.98] [transform-style:preserve-3d]",
          revealed ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[2rem] bg-white p-6 [backface-visibility:hidden]">
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

        <div
          className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[2rem] bg-orange-500 px-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
          aria-live="polite"
        >
          <span className="text-4xl font-extrabold tracking-wider text-white sm:text-5xl">
            {card.name}
          </span>
        </div>
      </div>
    </button>
  );
}
