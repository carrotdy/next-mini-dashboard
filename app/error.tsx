"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="px-6 pb-12 pt-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-lg font-semibold text-zinc-900">
          문제가 발생했어요
        </div>
        <div className="mt-2 text-sm text-zinc-500">
          잠시 후 다시 시도하거나 홈으로 이동해주세요.
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            다시 시도
          </button>

          <Link
            href="/"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            홈으로
          </Link>
        </div>

        <div className="mt-4 break-words text-xs text-zinc-400">
          {error.message}
        </div>
      </div>
    </div>
  );
}
