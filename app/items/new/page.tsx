import Link from "next/link";
import NewRecordForm from "./NewRecordForm";

export default function NewRecordPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-12 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-zinc-900">기록 작성</div>
          <div className="mt-1 text-sm text-zinc-500">
            날짜/카테고리/제목/수치를 입력하세요.
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 mr-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            홈
          </Link>
          <Link
            href="/items"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            목록
          </Link>
        </div>
      </div>

      <NewRecordForm />
    </div>
  );
}
