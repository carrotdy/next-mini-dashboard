import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";
import {
  categoryLabel,
  records,
  type HealthRecord,
  type RecordCategory,
} from "@/app/lib/records";
import { RecordsToolbar } from "../components/records/RecordsToolbar";
import { RecordsTable } from "../components/records/RecordsTable";
import { formatRecordValueText } from "../lib/format";
import { PaginationBar } from "../components/records/PaginationBar";
import { RecordsTabs } from "../components/records/RecordsTabs";
import ItemsFlashToast from "./ItemFlashToast";
import Link from "next/link";

type SearchParams = Record<string, string | string[] | undefined>;

const toSingle = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

const isRecordCategory = (v: string): v is RecordCategory =>
  v === "steps" || v === "sleep" || v === "mood" || v === "panic";

const parseDateMs = (date: string) => new Date(`${date}T00:00:00`).getTime();

const includesQuery = (r: HealthRecord, q: string) => {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;

  const hay = [
    r.date,
    r.title,
    r.note ?? "",
    r.category,
    categoryLabel[r.category],
  ]
    .join(" ")
    .toLowerCase();

  return hay.includes(needle);
};

const sortRecords = (all: HealthRecord[], sort: string) => {
  const copy = [...all];
  if (sort === "oldest") {
    return copy.sort((a, b) => parseDateMs(a.date) - parseDateMs(b.date));
  }
  return copy.sort((a, b) => parseDateMs(b.date) - parseDateMs(a.date));
};

const ItemsPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const rawCategory = toSingle(searchParams.category);
  const rawQ = toSingle(searchParams.q) ?? "";
  const rawSort = toSingle(searchParams.sort) ?? "recent";
  const rawPage = toSingle(searchParams.page) ?? "1";

  const category: RecordCategory | "all" =
    rawCategory && isRecordCategory(rawCategory) ? rawCategory : "all";

  const pageSize = 10;
  const page = Math.max(1, Number(rawPage) || 1);

  const filteredByCategory =
    category === "all"
      ? records
      : records.filter((r) => r.category === category);

  const filteredByQuery = filteredByCategory.filter((r) =>
    includesQuery(r, rawQ)
  );

  const sorted = sortRecords(filteredByQuery, rawSort);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(total, startIndex + pageSize);
  const pageRows = sorted.slice(startIndex, endIndex);

  const titleSuffix =
    category === "all" ? "전체" : categoryLabel[category] ?? category;

  return (
    <PageContainer>
      <ItemsFlashToast created={toSingle(searchParams.created) ?? undefined} />
      <TopNav title="기록" />

      <div className="px-6 pb-12 pt-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-2xl font-bold">
              기록 <span className="text-zinc-400">({titleSuffix})</span>
            </div>
          </div>

          <RecordsToolbar category={category} q={rawQ} sort={rawSort} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <RecordsTabs
            active={category}
            q={rawQ}
            sort={rawSort}
            counts={{
              all: records.length,
              steps: records.filter((r) => r.category === "steps").length,
              sleep: records.filter((r) => r.category === "sleep").length,
              mood: records.filter((r) => r.category === "mood").length,
              panic: records.filter((r) => r.category === "panic").length,
            }}
          />
          <Link href="/items/new" className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            작성
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <RecordsTable
            rows={pageRows.map((r, idx) => ({
              key: `${r.id}-${r.date}-${idx}`,
              id: r.id,
              date: r.date,
              category: r.category,
              categoryText: categoryLabel[r.category],
              title: r.title,
              valueText: formatRecordValueText(r),
              note: r.note,
            }))}
          />

          <PaginationBar
            total={total}
            page={safePage}
            pageSize={pageSize}
            totalPages={totalPages}
            buildHref={({ nextPage }) => {
              const sp = new URLSearchParams();

              if (category !== "all") sp.set("category", category);
              if (rawQ.trim()) sp.set("q", rawQ.trim());
              if (rawSort !== "recent") sp.set("sort", rawSort);
              if (nextPage > 1) sp.set("page", String(nextPage));

              const qs = sp.toString();
              return qs ? `/items?${qs}` : "/items";
            }}
          />
        </div>

        {total === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
            조건에 맞는 기록이 없어요.
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ItemsPage;
