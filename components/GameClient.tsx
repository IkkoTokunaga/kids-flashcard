"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlashCard } from "@/components/FlashCard";
import { TimerBar } from "@/components/TimerBar";
import { buildDeck } from "@/lib/buildDeck";
import type { Difficulty } from "@/lib/difficulty";

/** 答えを表示してから次の問題に進むまでの待機時間 */
const REVEAL_HOLD_MS = 1500;

interface Props {
  difficulty: Difficulty;
}

type Phase = "playing" | "revealed" | "finished";

export function GameClient({ difficulty }: Props) {
  const [deck, setDeck] = useState(() => buildDeck(difficulty));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [progress, setProgress] = useState(1);
  const [round, setRound] = useState(0);

  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentCard = deck[index];
  const total = deck.length;

  const cancelTimers = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= deck.length) {
        setPhase("finished");
        return prev;
      }
      setPhase("playing");
      setProgress(1);
      return next;
    });
  }, [deck.length]);

  const reveal = useCallback(() => {
    setPhase((prev) => {
      if (prev !== "playing") return prev;
      cancelTimers();
      setProgress(0);
      advanceTimerRef.current = setTimeout(goNext, REVEAL_HOLD_MS);
      return "revealed";
    });
  }, [cancelTimers, goNext]);

  // タイマー駆動: 残り時間を 0 まで減らし、切れたら自動で答えを表示
  useEffect(() => {
    if (phase !== "playing") return;

    startTimeRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const ratio = 1 - elapsed / difficulty.timeLimitMs;
      if (ratio <= 0) {
        setProgress(0);
        reveal();
        return;
      }
      setProgress(ratio);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [phase, difficulty.timeLimitMs, reveal, index]);

  // アンマウント時の片付け
  useEffect(() => () => cancelTimers(), [cancelTimers]);

  const restart = useCallback(() => {
    cancelTimers();
    setDeck(buildDeck(difficulty));
    setIndex(0);
    setProgress(1);
    setPhase("playing");
    setRound((r) => r + 1);
  }, [cancelTimers, difficulty]);

  const headerLabel = useMemo(
    () => `${Math.min(index + 1, total)} / ${total}もん`,
    [index, total]
  );

  if (phase === "finished") {
    return (
      <section
        className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center"
        aria-live="polite"
      >
        <p className="text-2xl font-bold text-orange-600">おしまい！</p>
        <p className="text-base text-gray-700">
          {difficulty.label}を ぜんぶ こたえたよ
        </p>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={restart}
            className="rounded-2xl bg-orange-500 px-6 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-orange-600"
          >
            もういちど
          </button>
          <Link
            href="/"
            className="rounded-2xl border-2 border-orange-300 px-6 py-4 text-lg font-bold text-orange-600 transition-colors hover:bg-orange-50"
          >
            トップへもどる
          </Link>
        </div>
      </section>
    );
  }

  if (!currentCard) {
    return (
      <p className="px-6 py-12 text-center text-gray-600">
        カードがよみこめませんでした。
      </p>
    );
  }

  return (
    <section
      key={round}
      className="flex flex-1 flex-col items-center gap-5 px-5"
      aria-label={`${difficulty.label}モード`}
    >
      <div className="flex w-full max-w-md items-center justify-between">
        <Link
          href="/"
          className="rounded-full border border-orange-200 px-4 py-1.5 text-sm font-semibold text-orange-600 hover:bg-orange-50"
          aria-label="トップにもどる"
        >
          ← もどる
        </Link>
        <span className="text-sm font-semibold text-gray-600">
          {headerLabel}
        </span>
      </div>

      <div className="w-full max-w-md">
        <TimerBar progress={progress} totalMs={difficulty.timeLimitMs} />
      </div>

      <div className="flex flex-1 w-full items-center justify-center">
        <FlashCard
          key={`${round}-${index}`}
          card={currentCard}
          revealed={phase === "revealed"}
          onReveal={reveal}
        />
      </div>

      <p className="pb-2 text-center text-sm text-gray-500">
        {phase === "playing"
          ? "えをタップで すぐにこたえ"
          : "つぎのもんだいへ…"}
      </p>
    </section>
  );
}
