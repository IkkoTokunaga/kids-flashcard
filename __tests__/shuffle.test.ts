import { pickRandom, shuffle } from "@/lib/shuffle";

describe("shuffle", () => {
  test("元の配列を破壊しない", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });

  test("同じ要素を全て含む", () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffle(input).sort()).toEqual([...input].sort());
  });
});

describe("pickRandom", () => {
  test("指定件数だけ返す", () => {
    expect(pickRandom([1, 2, 3, 4, 5], 3)).toHaveLength(3);
  });

  test("件数が要素数を超える場合は全要素を返す", () => {
    expect(pickRandom([1, 2, 3], 10)).toHaveLength(3);
  });

  test("件数が 0 以下なら空配列", () => {
    expect(pickRandom([1, 2, 3], 0)).toEqual([]);
    expect(pickRandom([1, 2, 3], -1)).toEqual([]);
  });
});
