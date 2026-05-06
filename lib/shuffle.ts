/**
 * Fisher-Yates によるシャッフル。元配列を変更せず、新しい配列を返す。
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 配列から重複なく `count` 件を抽出する。
 * `count` が要素数を超える場合は、シャッフル後の全要素を返す。
 */
export function pickRandom<T>(items: readonly T[], count: number): T[] {
  const shuffled = shuffle(items);
  return shuffled.slice(0, Math.max(0, Math.min(count, shuffled.length)));
}
