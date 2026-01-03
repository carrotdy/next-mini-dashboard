import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";
import { categoryLabel, type RecordCategory } from "@/app/lib/records";
import { RecordsToolbar } from "../components/records/RecordsToolbar";
import { RecordsTable } from "../components/records/RecordsTable";
import { PaginationBar } from "../components/records/PaginationBar";
import { RecordsTabs } from "../components/records/RecordsTabs";
import ItemsFlashToast from "./ItemFlashToast";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@prisma/client";

type SearchParams = Record<string, string | string[] | undefined>;

const toSingle = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

const isRecordCategory = (v: string): v is RecordCategory =>
  v === "steps" || v === "sleep" || v === "mood" || v === "panic";

const isYYYYMMDD = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);

const queryToCategory = (q: string): RecordCategory | null => {
  const s = q.trim();
  if (!s) return null;
  if (isRecordCategory(s)) return s;

  if (s.includes("걸음")) return "steps";
  if (s.includes("수면")) return "sleep";
  if (s.includes("기분")) return "mood";
  if (s.includes("공황")) return "panic";
  return null;
};

const ItemsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const rawCategory = toSingle(searchParams.category);
  const rawQ = (toSingle(searchParams.q) ?? "").trim();
  const rawSort = toSingle(searchParams.sort) ?? "recent";
  const rawPage = toSingle(searchParams.page) ?? "1";

  const category: RecordCategory | "all" =
    rawCategory && isRecordCategory(rawCategory) ? rawCategory : "all";

  const pageSize = 10;
  const page = Math.max(1, Number(rawPage) || 1);

  const where: Prisma.RecordWhereInput = {
    ...(category !== "all" ? { category } : {}),
    ...(rawQ
      ? {
          OR: [
            { title: { contains: rawQ } },
            { note: { contains: rawQ } },
            ...(isYYYYMMDD(rawQ)
              ? [
                  {
                    date: {
                      gte: new Date(`${rawQ}T00:00:00.000+09:00`),
                      lt: new Date(`${rawQ}T24:00:00.000+09:00`),
                    },
                  },
                ]
              : []),
            ...(queryToCategory(rawQ)
              ? [{ category: queryToCategory(rawQ)! }]
              : []),
          ],
        }
      : {}),
  };

  const orderBy: Prisma.RecordOrderByWithRelationInput =
    rawSort === "oldest" ? { date: "asc" } : { date: "desc" };

  const total = await prisma.record.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageRecords = await prisma.record.findMany({
    where,
    orderBy,
    skip: (safePage - 1) * pageSize,
    take: pageSize,
  });

  const grouped = await prisma.record.groupBy({
    by: ["category"],
    _count: { _all: true },
  });

  const counts: Record<"all" | RecordCategory, number> = {
    all: 0,
    steps: 0,
    sleep: 0,
    mood: 0,
    panic: 0,
  };

  for (const g of grouped) {
    const c = g.category as RecordCategory;
    counts[c] = g._count._all;
    counts.all += g._count._all;
  }

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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <RecordsTabs
            active={category}
            q={rawQ}
            sort={rawSort}
            counts={counts}
          />
          <Link
            href="/items/new"
            className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            작성
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <RecordsTable records={pageRecords} />

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
      </div>
    </PageContainer>
  );
};

export default ItemsPage;
