import { GENRES } from "@/lib/cards";
import {
  DIFFICULTIES,
  getDifficulty,
  selectGenresForDifficulty,
} from "@/lib/difficulty";

describe("difficulty", () => {
  test("3つの難易度が定義されている", () => {
    expect(DIFFICULTIES.map((d) => d.id)).toEqual(["easy", "normal", "hard"]);
  });

  test("制限時間は易→難で短くなる", () => {
    const [easy, normal, hard] = DIFFICULTIES;
    expect(easy.timeLimitMs).toBeGreaterThan(normal.timeLimitMs);
    expect(normal.timeLimitMs).toBeGreaterThan(hard.timeLimitMs);
  });

  test("ジャンル数は易→難で増える", () => {
    const [easy, normal, hard] = DIFFICULTIES;
    expect(easy.genreCount).toBeLessThan(normal.genreCount);
    expect(normal.genreCount).toBeLessThan(hard.genreCount);
    expect(hard.genreCount).toBe(GENRES.length);
  });

  test("getDifficulty は未知の id に対して undefined を返す", () => {
    expect(getDifficulty("unknown")).toBeUndefined();
    expect(getDifficulty("easy")?.id).toBe("easy");
  });

  test("selectGenresForDifficulty は genreCount 件のジャンル ID を返す", () => {
    for (const d of DIFFICULTIES) {
      const ids = selectGenresForDifficulty(d);
      expect(ids).toHaveLength(d.genreCount);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
