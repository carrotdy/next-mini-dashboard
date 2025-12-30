import Link from "next/link";
import { categoryLabel, records, type DemoRecord, type HealthRecord } from "@/app/lib/records";

export const RecentRecordsTable = () => {

  const parseDate = (d: string) => new Date(`${d}T00:00:00`).getTime();
  const sortedRecords = [...records].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const formatValueText = (value: HealthRecord) => {
    switch (value.category) {
      case 'steps':
        return `${value.value.toLocaleString()}걸음`;
      case 'sleep':
        return `${value.value.toFixed(0)}시간`
      case 'mood':
        return `${value.value.toFixed(0)}점`
      case 'panic':
        return `${value.value}회`
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">최근 기록</h2>
        <Link href="/items" className="text-sm text-zinc-500 hover:text-zinc-700">
          전체보기
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

        {sortedRecords.map((r, index) => (
          <div
            key={r.id}
            className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-zinc-50"
          >
            <div className="col-span-2 text-zinc-600">{index + 1}</div>
            <div className="col-span-2 text-zinc-600">{r.date}</div>

            <div className="col-span-2">
              <span className="inline-flex rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600">
                {categoryLabel[r.category]}
              </span>
            </div>

            <div className="col-span-2 font-semibold text-zinc-900">
              {formatValueText(r)}
            </div>

            <div className="col-span-3 text-zinc-500">
              {r.note ?? <span className="text-zinc-300">—</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
