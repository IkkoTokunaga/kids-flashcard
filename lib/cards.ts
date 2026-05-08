/**
 * フラッシュカードのデータ定義
 * 画像は OpenMoji (CC BY-SA 4.0) の SVG を `public/openmoji/{code}.svg` に配置する。
 * `code` は OpenMoji の Hex Code (大文字) を表す。
 */

export type GenreId =
  | "animals"
  | "fruits"
  | "vehicles"
  | "nature"
  | "instruments"
  | "tools"
  | "sports"
  | "appliances";

export interface Genre {
  id: GenreId;
  label: string;
}

export interface Card {
  /** OpenMoji の Hex Code (例: "1F436") */
  code: string;
  /** ひらがな表記の答え (例: "いぬ") */
  name: string;
  /** 所属ジャンル */
  genre: GenreId;
}

export const GENRES: readonly Genre[] = [
  { id: "animals", label: "どうぶつ" },
  { id: "fruits", label: "くだもの・やさい" },
  { id: "vehicles", label: "のりもの" },
  { id: "nature", label: "しぜん" },
  { id: "instruments", label: "がっき" },
  { id: "tools", label: "おしごとどうぐ" },
  { id: "sports", label: "スポーツ" },
  { id: "appliances", label: "かでん" },
] as const;

export const CARDS: readonly Card[] = [
  // どうぶつ
  { code: "1F436", name: "いぬ", genre: "animals" },
  { code: "1F431", name: "ねこ", genre: "animals" },
  { code: "1F404", name: "うし", genre: "animals" },
  { code: "1F437", name: "ぶた", genre: "animals" },
  { code: "1F98A", name: "きつね", genre: "animals" },
  { code: "1F981", name: "らいおん", genre: "animals" },
  { code: "1F418", name: "ぞう", genre: "animals" },
  { code: "1F992", name: "きりん", genre: "animals" },

  // くだもの・やさい
  { code: "1F34E", name: "りんご", genre: "fruits" },
  { code: "1F34C", name: "ばなな", genre: "fruits" },
  { code: "1F347", name: "ぶどう", genre: "fruits" },
  { code: "1F353", name: "いちご", genre: "fruits" },
  { code: "1F349", name: "すいか", genre: "fruits" },
  { code: "1F955", name: "にんじん", genre: "fruits" },
  { code: "1F345", name: "とまと", genre: "fruits" },
  { code: "1F33D", name: "とうもろこし", genre: "fruits" },

  // のりもの
  { code: "1F697", name: "くるま", genre: "vehicles" },
  { code: "1F68C", name: "ばす", genre: "vehicles" },
  { code: "1F683", name: "でんしゃ", genre: "vehicles" },
  { code: "1F685", name: "しんかんせん", genre: "vehicles" },
  { code: "2708", name: "ひこうき", genre: "vehicles" },
  { code: "1F6A2", name: "ふね", genre: "vehicles" },
  { code: "1F6B2", name: "じてんしゃ", genre: "vehicles" },
  { code: "1F692", name: "しょうぼうしゃ", genre: "vehicles" },

  // しぜん
  { code: "2600", name: "たいよう", genre: "nature" },
  { code: "2601", name: "くも", genre: "nature" },
  { code: "1F327", name: "あめ", genre: "nature" },
  { code: "2603", name: "ゆきだるま", genre: "nature" },
  { code: "26A1", name: "かみなり", genre: "nature" },
  { code: "1F308", name: "にじ", genre: "nature" },
  { code: "1F32A", name: "たつまき", genre: "nature" },

  // がっき
  { code: "1F3B8", name: "ぎたー", genre: "instruments" },
  { code: "1F3B9", name: "ぴあの", genre: "instruments" },
  { code: "1F941", name: "たいこ", genre: "instruments" },
  { code: "1F3BA", name: "とらんぺっと", genre: "instruments" },
  { code: "1F3BB", name: "ばいおりん", genre: "instruments" },
  { code: "1FA97", name: "あこーでぃおん", genre: "instruments" },
  { code: "1F3A4", name: "まいく", genre: "instruments" },
  { code: "1FA98", name: "まらかす", genre: "instruments" },

  // おしごとどうぐ
  { code: "1F528", name: "かなづち", genre: "tools" },
  { code: "1F527", name: "すぱな", genre: "tools" },
  { code: "1FA9B", name: "どらいばー", genre: "tools" },
  { code: "1FA9A", name: "のこぎり", genre: "tools" },
  { code: "2702", name: "はさみ", genre: "tools" },
  { code: "1F4CF", name: "ものさし", genre: "tools" },
  { code: "1F529", name: "ねじ", genre: "tools" },
  { code: "1F58C", name: "ふで", genre: "tools" },

  // スポーツ
  { code: "26BD", name: "さっかー", genre: "sports" },
  { code: "26BE", name: "やきゅう", genre: "sports" },
  { code: "1F3C0", name: "ばすけ", genre: "sports" },
  { code: "1F3BE", name: "てにす", genre: "sports" },
  { code: "1F3D0", name: "ばれー", genre: "sports" },
  { code: "1F3BF", name: "すきー", genre: "sports" },
  { code: "1F94A", name: "ぼくしんぐ", genre: "sports" },
  { code: "1F3D3", name: "たっきゅう", genre: "sports" },

  // かでん
  { code: "1F4FA", name: "てれび", genre: "appliances" },
  { code: "1F4F1", name: "すまほ", genre: "appliances" },
  { code: "1F4DE", name: "でんわ", genre: "appliances" },
  { code: "1F4F7", name: "かめら", genre: "appliances" },
  { code: "1F4FB", name: "らじお", genre: "appliances" },
  { code: "1F4A1", name: "でんきゅう", genre: "appliances" },
  { code: "1F4BB", name: "ぱそこん", genre: "appliances" },
  { code: "1F50A", name: "すぴーかー", genre: "appliances" },
] as const;

/** 指定したジャンル群に含まれるカードのみを返す */
export function filterCardsByGenres(
  cards: readonly Card[],
  genres: readonly GenreId[]
): Card[] {
  const genreSet = new Set(genres);
  return cards.filter((card) => genreSet.has(card.genre));
}

/** OpenMoji SVG ファイルへのパスを返す */
export function getCardImagePath(card: Card): string {
  return `/openmoji/${card.code}.svg`;
}
