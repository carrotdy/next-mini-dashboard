import Link from "next/link";

export const PaginationBar = ({
  total,
  page,
  pageSize,
  totalPages,
  buildHref,
}: {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  buildHref: (args: { nextPage: number }) => string;
}) => {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  const windowStart = Math.max(1, page - 2);
  const windowEnd = Math.min(totalPages, page + 2);
  const pages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, i) => windowStart + i
  );

  return (
    <div className="flex flex-col gap-3 border-t border-zinc-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs text-zinc-500">
        {start}–{end} / {total}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={buildHref({ nextPage: Math.max(1, page - 1) })}
          aria-disabled={page <= 1}
          className={[
            "rounded-lg border px-3 py-2 text-xs",
            page <= 1
              ? "pointer-events-none border-zinc-200 text-zinc-300"
              : "border-zinc-200 text-zinc-700 hover:bg-zinc-50",
          ].join(" ")}
        >
          이전
        </Link>

        <div className="flex items-center gap-1">
          {pages.map((p) => (
            <Link
              key={p}
              href={buildHref({ nextPage: p })}
              className={[
                "h-9 w-9 rounded-lg border text-center text-xs leading-9",
                p === page
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-50",
              ].join(" ")}
            >
              {p}
            </Link>
          ))}
        </div>

        <Link
          href={buildHref({ nextPage: Math.min(totalPages, page + 1) })}
          aria-disabled={page >= totalPages}
          className={[
            "rounded-lg border px-3 py-2 text-xs",
            page >= totalPages
              ? "pointer-events-none border-zinc-200 text-zinc-300"
              : "border-zinc-200 text-zinc-700 hover:bg-zinc-50",
          ].join(" ")}
        >
          다음
        </Link>
      </div>
    </div>
  );
};
