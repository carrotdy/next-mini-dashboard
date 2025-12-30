// lib/demo.ts
import type { RecordCategory } from "@/app/lib/records";

export const metricMeta: Record<
    RecordCategory,
    { title: string; accentClass: string }
> = {
    steps: {
        title: "Steps",
        accentClass: "bg-indigo-600",
    },
    sleep: {
        title: "Sleep",
        accentClass: "bg-violet-600",
    },
    mood: {
        title: "Mood",
        accentClass: "bg-emerald-600",
    },
    panic: {
        title: "Panic",
        accentClass: "bg-rose-600",
    },
};


