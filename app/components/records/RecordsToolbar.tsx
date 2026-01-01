import type { RecordCategory } from "@/app/lib/records";

export const RecordsToolbar = ({
  category,
  q,
  sort,
}: {
  category: RecordCategory | "all";
  q: string;
  sort: string;
}) => {
  return (
    <form
      method="get"
      action="/items"
      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
    >
      <select
        name="category"
        defaultValue={category === "all" ? "" : category}
        className="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800"
      >
        <option value="">전체</option>
        <option value="steps">걸음수</option>
        <option value="sleep">수면</option>
        <option value="mood">기분</option>
        <option value="panic">공황</option>
      </select>

      <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3">
        <span className="text-zinc-400">⌕</span>
        <input
          name="q"
          defaultValue={q}
          placeholder="검색..."
          className="w-56 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 sm:w-72"
        />
      </div>

      <select
        name="sort"
        defaultValue={sort}
        className="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800"
      >
        <option value="recent">최신순</option>
        <option value="oldest">오래된순</option>
      </select>

      <button
        type="submit"
        className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
      >
        적용
      </button>
    </form>
  );
};
