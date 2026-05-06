import { Footer } from "@/components/Footer";
import { DifficultyButton } from "@/components/DifficultyButton";
import { DIFFICULTIES } from "@/lib/difficulty";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-orange-600 sm:text-4xl">
          こどもフラッシュカード
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          えをみて、こたえをあてよう！
        </p>
      </header>

      <section className="mt-8 flex flex-col gap-4" aria-label="難易度を選ぶ">
        <h2 className="text-center text-lg font-semibold text-gray-700">
          むずかしさを えらんでね
        </h2>
        <ul className="flex flex-col gap-4">
          {DIFFICULTIES.map((d) => (
            <li key={d.id}>
              <DifficultyButton difficulty={d} />
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
