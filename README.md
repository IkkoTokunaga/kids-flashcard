# こどもフラッシュカード (kids-flashcard)

幼児向けのシンプルなフラッシュカードアプリです。難易度を3段階から選び、
画面に出る絵を見て、ひらがなの答えを当てます。

## 特徴

- 難易度3段階（ジャンル数 × 制限時間で調整）
  - **かんたん**: 3ジャンル / 制限時間 5秒
  - **ふつう**: 5ジャンル / 制限時間 3秒
  - **むずかしい**: 全8ジャンル / 制限時間 2秒
- 制限時間が経過するか、絵をタップすると答え（ひらがな）を表示
- 表示後は自動で次の問題へ進行
- モバイルファースト & レスポンシブ
- 画像は **OpenMoji**（CC BY-SA 4.0）の SVG を使用（著作権フリー）

## 技術スタック

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Jest + React Testing Library

## 開発の進め方

開発はすべて Docker Compose 上で行います。

```bash
# 依存パッケージのインストール
docker compose run --rm app npm install

# OpenMoji の SVG をダウンロード（初回のみ）
docker compose run --rm app npm run download-openmoji

# 開発サーバー起動 (http://localhost:3000)
docker compose up
```

### よく使うコマンド

```bash
docker compose run --rm app npm run lint        # ESLint
docker compose run --rm app npm run type-check  # TypeScript 型チェック
docker compose run --rm app npm test            # Jest
```

## ディレクトリ構成

```
.
├── app/               # Next.js App Router (page / layout / globals.css)
├── components/        # 再利用可能な UI コンポーネント
├── lib/               # カードデータ・難易度定義・ユーティリティ
├── public/openmoji/   # OpenMoji SVG (download-openmoji で取得)
├── scripts/           # 補助スクリプト (OpenMoji ダウンロード)
└── __tests__/         # 単体テスト
```

## ライセンス・クレジット

- 本リポジトリのコード: MIT
- 絵文字: [OpenMoji](https://openmoji.org/) – the open-source emoji and icon project.
  License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
