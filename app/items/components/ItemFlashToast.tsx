"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ItemsFlashToast() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;

    const created = sp.get("created");
    const updated = sp.get("updated");
    const deleted = sp.get("deleted");

    if (created !== "1" && updated !== "1" && deleted !== "1") return;

    shown.current = true;

    if (created === "1") toast.success("저장 완료!");
    if (updated === "1") toast.success("수정 완료!");
    if (deleted === "1") toast.success("삭제 완료!");

    const next = new URLSearchParams(sp.toString());
    next.delete("created");
    next.delete("updated");
    next.delete("deleted");

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [sp, router, pathname]);

  return null;
}
