"use client";

import { updateRecord } from "@/app/action";
import {
  categoryLabel,
  type RecordCategory,
} from "@/app/lib/records";
import { Record as DbRecord } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";

const unitText = (category: RecordCategory) => {
  switch (category) {
    case "steps":
      return "걸음";
    case "sleep":
      return "시간";
    case "mood":
      return "점";
    case "panic":
      return "회";
  }
};

const Field = ({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) => {
  return (
    <div>
      <div className="text-sm font-semibold text-zinc-900">{label}</div>
      <div className="mt-2">{children}</div>
      {hint && <div className="mt-1 text-xs text-zinc-400">{hint}</div>}
    </div>
  );
};

const toDateInputValue = (d: Date) => d.toISOString().slice(0, 10);

export function RecordEditForm({ record }: { record: DbRecord }) {
  const [date, setDate] = useState<string>(() => toDateInputValue(record.date));
  const [category, setCategory] = useState<RecordCategory>(record.category);
  const [title, setTitle] = useState(record.title);
  const [value, setValue] = useState<string>(String(record.value));
  const [note, setNote] = useState(record.note ?? "");

  const unit = useMemo(() => unitText(category), [category]);

  const isValidNumberInput = (v: string) => v === "" || /^\d*([.,]?\d*)?$/.test(v);

  return (
    <form action={updateRecord} className="space-y-6">
      <input type="hidden" name="id" value={record.id} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="날짜">
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
          />
        </Field>

        <Field label="카테고리">
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as RecordCategory)}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
          >
            <option value="steps">{categoryLabel.steps}</option>
            <option value="sleep">{categoryLabel.sleep}</option>
            <option value="mood">{categoryLabel.mood}</option>
            <option value="panic">{categoryLabel.panic}</option>
          </select>
        </Field>
      </div>

      <Field label="제목" hint="예: 출근, 낮잠, 기분 체크 등">
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
          placeholder="제목을 입력하세요"
        />
      </Field>

      <Field label="수치">
        <div className="flex items-center gap-2">
          <input
            name="value"
            inputMode="numeric"
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              if (isValidNumberInput(next)) setValue(next);
            }}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
            placeholder="숫자 입력"
          />
          <div className="min-w-14 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-center text-sm font-semibold text-zinc-700">
            {unit}
          </div>
        </div>
      </Field>

      <Field label="메모">
        <textarea
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-28 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400"
          placeholder="메모를 입력하세요"
        />
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Link
          href={`/items/${record.id}`}
          className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-center text-sm font-medium leading-10 text-zinc-700 hover:bg-zinc-50"
        >
          취소
        </Link>

        <button
          type="submit"
          className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
        >
          저장
        </button>
      </div>
    </form>
  );
}
