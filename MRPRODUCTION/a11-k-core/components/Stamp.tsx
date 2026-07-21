export const A11KStamp = ({
  variant = "engine",
}: { variant?: "engine" | "brushworks" }) => (
  <div className="flex items-center gap-2 text-sm text-gray-400">
    {variant === "engine" ? (
      <>
        <span>Powered by A11‑K</span>
        <span className="opacity-50">|</span>
        <span>Secured by A11‑K</span>
      </>
    ) : (
      <>
        <span>Built with Brushworks</span>
        <span className="opacity-50">|</span>
        <span>Powered by A11‑K</span>
      </>
    )}
  </div>
);