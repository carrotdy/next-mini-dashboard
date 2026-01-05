"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const toSingle = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default function ItemsFlashToast({ created, updated, deleted }: {
  created?: string | string[];
  updated?: string | string[];
  deleted?: string | string[];
}) {
  const router = useRouter();
  const shown = useRef(false);

  const c = toSingle(created);
  const u = toSingle(updated);
  const d = toSingle(deleted);

  useEffect(() => {
    if (shown.current) return;

    if (c === "1") {
      shown.current = true;
      toast.success("저장 완료!");
      router.replace("/items");
    }

    if (u === "1") {
      shown.current = true;
      toast.success("수정 완료!");
      router.replace("/items");
    }

    if (d === "1") {
      shown.current = true;
      toast.success("삭제 완료!");
      router.replace("/items");
    }
  }, [c, u, d, router]);

  return null;
}