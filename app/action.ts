"use server";

import { redirect } from "next/navigation";
import { prisma } from "./lib/prisma";
import { RecordCategory } from "@prisma/client";

export async function createRecord(formData: FormData) {
  const date = String(formData.get("date") ?? "");
  const category = String(formData.get("category") ?? "");
  const title = String(formData.get("title") ?? "");
  const valueRaw = String(formData.get("value") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!date || !category || !title || !valueRaw) {
    throw new Error("필수값이 누락되었습니다.");
  }

  const value = Number(valueRaw);
  if (Number.isNaN(value)) throw new Error("수치는 숫자여야 해요.");

  await prisma.record.create({
    data: {
      date: new Date(date), 
      category: category as RecordCategory,
      title,
      value,
      note: note.length ? note : null,
    },
  });

  redirect("/items?created=1"); 
}
