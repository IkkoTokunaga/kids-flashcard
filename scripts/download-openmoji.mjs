// OpenMoji SVG ダウンロードスクリプト
//
// `lib/cards.ts` に定義された OpenMoji コードに対応するカラー SVG を
// GitHub の OpenMoji リポジトリから取得し、`public/openmoji/` に保存する。
//
// OpenMoji は Hochschule für Gestaltung Schwäbisch Gmünd の制作する
// オープンソースの絵文字プロジェクトで、CC BY-SA 4.0 でライセンスされている。
// https://openmoji.org/ / https://github.com/hfg-gmuend/openmoji
//
// 使い方: `node scripts/download-openmoji.mjs`

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const cardsFile = resolve(projectRoot, "lib/cards.ts");
const outDir = resolve(projectRoot, "public/openmoji");

const BASE_URL =
  "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg";

async function extractCodes() {
  const source = await readFile(cardsFile, "utf8");
  const codes = new Set();
  const re = /code:\s*"([0-9A-Fa-f-]+)"/g;
  for (const match of source.matchAll(re)) {
    codes.add(match[1].toUpperCase());
  }
  return [...codes];
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function downloadOne(code) {
  const filename = `${code}.svg`;
  const dest = resolve(outDir, filename);
  if (await exists(dest)) {
    return { code, status: "skip" };
  }
  const url = `${BASE_URL}/${filename}`;
  const res = await fetch(url);
  if (!res.ok) {
    return { code, status: "error", message: `HTTP ${res.status} ${url}` };
  }
  const text = await res.text();
  await writeFile(dest, text, "utf8");
  return { code, status: "ok" };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const codes = await extractCodes();
  if (codes.length === 0) {
    console.error("no codes found in lib/cards.ts");
    process.exit(1);
  }

  console.log(`Downloading ${codes.length} OpenMoji SVGs to ${outDir}`);
  let ok = 0;
  let skip = 0;
  const errors = [];
  for (const code of codes) {
    const r = await downloadOne(code);
    if (r.status === "ok") {
      ok += 1;
      console.log(`  ok    ${code}`);
    } else if (r.status === "skip") {
      skip += 1;
      console.log(`  skip  ${code} (already exists)`);
    } else {
      errors.push(r);
      console.warn(`  ERR   ${code}: ${r.message}`);
    }
  }

  console.log(`\nDone. ok=${ok} skip=${skip} error=${errors.length}`);
  if (errors.length > 0) {
    process.exit(1);
  }
}

await main();
