"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ItemsFlashToast({ created }: { created?: string }) {
  const router = useRouter();
  const shown = useRef(false);

  useEffect(() => {
    if (created === "1" && !shown.current) {
      shown.current = true;
      toast.success("저장 완료!");
      router.replace("/items");
    }
  }, [created, router]);

  return null;
}