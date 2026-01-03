"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function CreatedToast({ id }: { id: string }) {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (sp.get("created") === "1") {
      toast.success("저장완료!");
      router.replace(`/items/${id}`, { scroll: false }); // 새로고침해도 토스트 반복 안 뜨게
    }
  }, [sp, router, id]);

  return null;
}
