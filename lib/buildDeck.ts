import { CARDS, filterCardsByGenres, type Card } from "./cards";
import { type Difficulty, selectGenresForDifficulty } from "./difficulty";
import { pickRandom } from "./shuffle";

/**
 * 指定難易度に応じた1ラウンド分のカード列を組み立てる。
 *  1. 難易度に応じてジャンルを絞り込む
 *  2. 該当するカードからランダムに `questionCount` 件を抽出
 *  3. ただし枚数が不足する場合は、足りない分だけ重複出題を許す
 */
export function buildDeck(difficulty: Difficulty): Card[] {
  const genres = selectGenresForDifficulty(difficulty);
  const pool = filterCardsByGenres(CARDS, genres);

  if (pool.length === 0) {
    return [];
  }

  const target = difficulty.questionCount;
  if (pool.length >= target) {
    return pickRandom(pool, target);
  }

  const deck: Card[] = pickRandom(pool, pool.length);
  while (deck.length < target) {
    const remaining = target - deck.length;
    deck.push(...pickRandom(pool, Math.min(remaining, pool.length)));
  }
  return deck.slice(0, target);
}
