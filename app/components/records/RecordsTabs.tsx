import Link from "next/link";
import { categoryLabel, type RecordCategory } from "@/app/lib/records";

type TabsCounts = {
  all: number;
  steps: number;
  sleep: number;
  mood: number;
  panic: number;
};

export const RecordsTabs = ({
  active,
  q,
  sort,
  counts,
}: {
  active: RecordCategory | "all";
  q: string;
  sort: string;
  counts: TabsCounts;
}) => {
  const buildHref = (nextCategory: RecordCategory | "all") => {
    const sp = new URLSearchParams();

    if (nextCategory !== "all") sp.set("category", nextCategory);
    if (q.trim()) sp.set("q", q.trim());
    if (sort !== "recent") sp.set("sort", sort);

    const qs = sp.toString();
    return qs ? `/items?${qs}` : "/items";
  };

  const tabs: Array<{
    key: RecordCategory | "all";
    label: string;
    count: number;
  }> = [
    { key: "all", label: "전체", count: counts.all },
    { key: "steps", label: categoryLabel.steps, count: counts.steps },
    { key: "sleep", label: categoryLabel.sleep, count: counts.sleep },
    { key: "mood", label: categoryLabel.mood, count: counts.mood },
    { key: "panic", label: categoryLabel.panic, count: counts.panic },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const isActive = t.key === active;

        return (
          <Link
            key={t.key}
            href={buildHref(t.key)}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm",
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
            ].join(" ")}
          >
            <span>{t.label}</span>
            <span
              className={[
                "rounded-full px-2 py-0.5 text-xs",
                isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-600",
              ].join(" ")}
            >
              {t.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
