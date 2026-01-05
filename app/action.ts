"use server";

import { redirect } from "next/navigation";
import { prisma } from "./lib/prisma";
import { RecordCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";
import type { ActionState } from "./actionState";

const isValidCategory = (v: string): v is RecordCategory =>
  v === "steps" || v === "sleep" || v === "mood" || v === "panic";

const parseNumber = (raw: string) => {
  const s = raw.trim();
  if (!s) return { ok: false as const, error: "수치를 입력해주세요." };
  if (!/^\d+([.,]\d+)?$/.test(s))
    return { ok: false as const, error: "수치는 숫자만 입력할 수 있어요." };

  const n = Number(s.replace(",", "."));
  if (Number.isNaN(n)) return { ok: false as const, error: "수치는 숫자여야 해요." };
  return { ok: true as const, value: n };
};

export async function createRecord(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const date = String(formData.get("date") ?? "");
  const categoryRaw = String(formData.get("category") ?? "");
  const title = String(formData.get("title") ?? "");
  const valueRaw = String(formData.get("value") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!date || !categoryRaw || !title || !valueRaw) {
    return { error: "필수값이 누락되었습니다." };
  }
  if (!isValidCategory(categoryRaw)) return { error: "카테고리가 올바르지 않습니다." };

  const parsed = parseNumber(valueRaw);
  if (!parsed.ok) return { error: parsed.error };

  await prisma.record.create({
    data: {
      date: new Date(date),
      category: categoryRaw,
      title,
      value: parsed.value,
      note: note.length ? note : null,
    },
  });

  revalidatePath("/items");
  revalidatePath("/");

  redirect("/items?created=1");
}

export async function updateRecord(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { error: "id가 올바르지 않습니다." };

  const date = String(formData.get("date") ?? "");
  const categoryRaw = String(formData.get("category") ?? "");
  const title = String(formData.get("title") ?? "");
  const valueRaw = String(formData.get("value") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!date || !categoryRaw || !title || !valueRaw) {
    return { error: "필수값이 누락되었습니다." };
  }
  if (!isValidCategory(categoryRaw)) return { error: "카테고리가 올바르지 않습니다." };

  const parsed = parseNumber(valueRaw);
  if (!parsed.ok) return { error: parsed.error };

  await prisma.record.update({
    where: { id },
    data: {
      date: new Date(date),
      category: categoryRaw,
      title,
      value: parsed.value,
      note: note.length ? note : null,
    },
  });

  revalidatePath("/items");
  revalidatePath(`/items/${id}`);
  revalidatePath("/");

  redirect(`/items/${id}?updated=1`);
}

export async function deleteRecord(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { error: "id가 올바르지 않습니다." };

  await prisma.record.delete({ where: { id } });

  revalidatePath("/items");
  revalidatePath("/");
  redirect("/items?deleted=1");
}
