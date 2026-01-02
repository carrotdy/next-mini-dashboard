import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
        <div className="text-xl font-bold text-zinc-900">
          페이지를 찾을 수 없어요
        </div>
        <div className="mt-2 text-sm text-zinc-500">
          주소가 잘못됐거나 삭제된 페이지일 수 있어요.
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            홈으로
          </Link>
          <Link
            href="/items"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            기록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
