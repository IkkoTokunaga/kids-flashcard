import { CARDS, GENRES, filterCardsByGenres, getCardImagePath } from "@/lib/cards";

describe("cards data", () => {
  test("全てのジャンルにカードが存在する", () => {
    for (const genre of GENRES) {
      const cardsInGenre = CARDS.filter((c) => c.genre === genre.id);
      expect(cardsInGenre.length).toBeGreaterThan(0);
    }
  });

  test("カード名はひらがな・カタカナ・長音のみで構成される", () => {
    const allowed = /^[\u3040-\u309F\u30A0-\u30FFー]+$/;
    for (const card of CARDS) {
      expect(card.name).toMatch(allowed);
    }
  });

  test("OpenMoji コードは大文字16進数で表現される", () => {
    const re = /^[0-9A-F]+(-[0-9A-F]+)*$/;
    for (const card of CARDS) {
      expect(card.code).toMatch(re);
    }
  });

  test("filterCardsByGenres は指定ジャンルのみを返す", () => {
    const result = filterCardsByGenres(CARDS, ["animals"]);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((c) => c.genre === "animals")).toBe(true);
  });

  test("getCardImagePath は public/openmoji 配下の SVG パスを返す", () => {
    const card = CARDS[0];
    expect(getCardImagePath(card)).toBe(`/openmoji/${card.code}.svg`);
  });
});
