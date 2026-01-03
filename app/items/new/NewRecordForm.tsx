"use client";

import Link from "next/link";
import { useState } from "react";
import { createRecord } from "@/app/action";

const isValidNumberInput = (v: string) => v === "" || /^\d*([.,]?\d*)?$/.test(v);

export default function NewRecordForm() {
  const [value, setValue] = useState("");

  return (
    <form action={createRecord} className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-700">날짜</span>
          <input
            name="date"
            type="date"
            required
            className="h-10 rounded-lg border border-zinc-200 px-3 text-sm"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-700">카테고리</span>
          <select
            name="category"
            required
            defaultValue="steps"
            className="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm"
          >
            <option value="steps">걸음수</option>
            <option value="sleep">수면</option>
            <option value="mood">기분</option>
            <option value="panic">공황</option>
          </select>
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-zinc-700">제목</span>
          <input
            name="title"
            required
            placeholder="예) 산책 30분"
            className="h-10 rounded-lg border border-zinc-200 px-3 text-sm"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-700">수치</span>
          <input
            name="value"
            required
            inputMode="decimal"
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              if (isValidNumberInput(next)) setValue(next);
            }}
            placeholder="예) 1234"
            className="h-10 rounded-lg border border-zinc-200 px-3 text-sm"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-zinc-700">메모(선택)</span>
          <textarea
            name="note"
            rows={4}
            placeholder="예) 컨디션 좋았음"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Link
          href="/items"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          취소
        </Link>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          저장
        </button>
      </div>
    </form>
  );
}
