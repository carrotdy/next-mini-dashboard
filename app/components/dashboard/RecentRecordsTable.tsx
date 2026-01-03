import { formatValueText } from "@/app/lib/format";
import type { Record as DbRecord } from "@prisma/client";
import { categoryLabel } from "@/app/lib/records";
import Link from "next/link";

type Props = { records: DbRecord[] };

const dtf = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatDate = (d: Date) => dtf.format(d);

export function RecentRecordsTable({ records }: Props) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">최근 기록</h2>
        <Link href="/items/new" className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          작성
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-600">
          <div className="col-span-2">번호</div>
          <div className="col-span-2">날짜</div>
          <div className="col-span-2">카테고리</div>
          <div className="col-span-2">수치</div>
          <div className="col-span-3">메모</div>
        </div>

        {records.map((r, index) => (
          <Link key={r.id} href={`/items/${r.id}`}>
            <div
              className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-zinc-50"
            >
              <div className="col-span-2 text-zinc-600">{index + 1}</div>
              <div className="col-span-2 text-zinc-600">{formatDate(r.date)}</div>

              <div className="col-span-2">
                <span className="inline-flex rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600">
                  {categoryLabel[r.category]}
                </span>
              </div>

              <div className="col-span-2 font-semibold text-zinc-900">
                {formatValueText(r.category, r.value)}
              </div>

              <div className="col-span-3 text-zinc-500">
                {r.note ?? <span className="text-zinc-300">—</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
