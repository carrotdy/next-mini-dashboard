import { formatValueText } from "@/app/lib/format";
import { categoryLabel } from "@/app/lib/records";
import {  Record as DbRecord, RecordCategory } from "@prisma/client";
import Link from "next/link";

const pillClass = (category: string) => {
  switch (category) {
    case "steps":
      return "border-sky-200 bg-sky-50 text-sky-700";
    case "sleep":
      return "border-indigo-200 bg-indigo-50 text-indigo-700";
    case "mood":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "panic":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-700";
  }
};

const dtf = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatDate = (d: Date) => dtf.format(d);   

export const RecordsTable = ({ records }: { records: DbRecord[] }) => {
  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
        아직 기록이 없어요.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-600">
        <div className="col-span-3">날짜</div>
        <div className="col-span-2">카테고리</div>
        <div className="col-span-3">제목</div>
        <div className="col-span-2">수치</div>
        <div className="col-span-2">메모</div>
      </div>

      {records.map((r) => {
        const category = r.category as RecordCategory;  
        
        return (
          <Link key={r.id} href={`/items/${r.id}`}>
            <div className="grid grid-cols-12 items-center px-4 py-3 text-sm hover:bg-zinc-50">
              <div className="col-span-3 font-medium text-zinc-900">
                {formatDate(r.date)}
              </div>

              <div className="col-span-2">
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2 py-1 text-xs",
                    pillClass(category),
                  ].join(" ")}
                >
                  {categoryLabel[category]}
                </span>
              </div>

              <div className="col-span-3 text-zinc-900">{r.title}</div>

              <div className="col-span-2 font-semibold text-zinc-900">
                {formatValueText(category, r.value)}
              </div>

              <div className="col-span-2 text-zinc-500">
                {r.note ?? <span className="text-zinc-300">—</span>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
