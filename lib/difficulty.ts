import { GENRES, type GenreId } from "./cards";

export type DifficultyId = "easy" | "normal" | "hard";

export interface Difficulty {
  id: DifficultyId;
  label: string;
  description: string;
  /** 出題対象とするジャンル数 (全ジャンルから先頭 N 件を抽出) */
  genreCount: number;
  /** 1問あたりの制限時間 (ミリ秒) */
  timeLimitMs: number;
  /** 1ラウンドの問題数 */
  questionCount: number;
  /** UI 用のテーマカラー (Tailwind クラス) */
  colorClass: string;
}

export const DIFFICULTIES: readonly Difficulty[] = [
  {
    id: "easy",
    label: "かんたん",
    description: "3しゅるい・5びょう",
    genreCount: 3,
    timeLimitMs: 5000,
    questionCount: 10,
    colorClass: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    id: "normal",
    label: "ふつう",
    description: "5しゅるい・3びょう",
    genreCount: 5,
    timeLimitMs: 3000,
    questionCount: 10,
    colorClass: "bg-amber-500 hover:bg-amber-600",
  },
  {
    id: "hard",
    label: "むずかしい",
    description: "ぜんぶ・2びょう",
    genreCount: GENRES.length,
    timeLimitMs: 2000,
    questionCount: 12,
    colorClass: "bg-rose-500 hover:bg-rose-600",
  },
] as const;

export function getDifficulty(id: string): Difficulty | undefined {
  return DIFFICULTIES.find((d) => d.id === id);
}

/**
 * 難易度に応じて、出題対象のジャンルを決定する。
 * 全ジャンル配列の先頭から `genreCount` 件を取り出すことで、
 * 表示順とユーザーの期待を揃える。
 */
export function selectGenresForDifficulty(
  difficulty: Difficulty
): GenreId[] {
  return GENRES.slice(0, difficulty.genreCount).map((g) => g.id);
}
