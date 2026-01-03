"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const toSingle = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default function ItemsFlashToast(props: {
  created?: string | string[];
  updated?: string | string[];
  deleted?: string | string[];
}) {
  const router = useRouter();
  const shown = useRef(false);

  const created = toSingle(props.created);
  const updated = toSingle(props.updated);
  const deleted = toSingle(props.deleted);

  useEffect(() => {
    if (shown.current) return;

    if (created === "1") {
      shown.current = true;
      toast.success("저장 완료!");
      router.replace("/items");
      return;
    }

    if (updated === "1") {
      shown.current = true;
      toast.success("수정 완료!");
      router.replace("/items");
      return;
    }

    if (deleted === "1") {
      shown.current = true;
      toast.success("삭제 완료!");
      router.replace("/items");
    }
  }, [created, deleted, router]);

  return null;
}
