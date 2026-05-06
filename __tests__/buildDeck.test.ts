import { buildDeck } from "@/lib/buildDeck";
import { DIFFICULTIES, selectGenresForDifficulty } from "@/lib/difficulty";

describe("buildDeck", () => {
  test("各難易度で questionCount 枚のカードを返す", () => {
    for (const d of DIFFICULTIES) {
      const deck = buildDeck(d);
      expect(deck).toHaveLength(d.questionCount);
    }
  });

  test("出題されるカードのジャンルは全て選択ジャンルに含まれる", () => {
    for (const d of DIFFICULTIES) {
      const allowed = new Set(selectGenresForDifficulty(d));
      const deck = buildDeck(d);
      for (const card of deck) {
        expect(allowed.has(card.genre)).toBe(true);
      }
    }
  });
});
