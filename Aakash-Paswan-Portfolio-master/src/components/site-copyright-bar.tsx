export function SiteCopyrightBar() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-between gap-2 border-t border-line px-6 py-6 text-[10px] uppercase tracking-[0.06em] text-muted-text sm:text-xs sm:tracking-[0.15em] sm:flex-row md:px-[120px]">
      <p className="whitespace-nowrap">&copy; {year} AP Works. All rights reserved.</p>
      <p>
        Developed by{" "}
        <a
          href="https://portfolio.paruidev.com/"
          target="_blank"
          rel="noopener"
          className="font-semibold text-foreground transition-colors hover:text-muted-text"
        >
          Parui Dev
        </a>
      </p>
    </div>
  );
}
