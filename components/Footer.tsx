export function Footer() {
  return (
    <footer className="mt-auto px-4 py-3 text-center text-xs text-gray-500">
      <p>
        絵文字:{" "}
        <a
          href="https://openmoji.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700"
        >
          OpenMoji
        </a>{" "}
        – the open-source emoji and icon project.
        <br />
        License:{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700"
        >
          CC BY-SA 4.0
        </a>
      </p>
    </footer>
  );
}
