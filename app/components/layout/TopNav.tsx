import Link from "next/link";

export const TopNav = ({ title }: { title: string }) => {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <input
            placeholder="검색..."
            className="w-72 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300"
          />
        </div>

        <Link
          href="/"
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
        >
          홈
        </Link>
        <Link
          href="/items"
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
        >
          기록
        </Link>
      </div>
    </header>
  );
};
