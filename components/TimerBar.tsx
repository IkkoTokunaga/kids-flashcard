"use client";

interface Props {
  /** 残り時間の比率 (0 から 1) */
  progress: number;
  /** 制限時間 (ミリ秒)。アクセシビリティ用 */
  totalMs: number;
}

export function TimerBar({ progress, totalMs }: Props) {
  const clamped = Math.max(0, Math.min(1, progress));
  const percent = Math.round(clamped * 100);

  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-orange-100"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={`のこり時間 ${Math.ceil((totalMs * clamped) / 1000)}びょう`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 transition-[width] duration-100 ease-linear"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
