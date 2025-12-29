// lib/demo.ts
import type { DemoKpi, DemoRecord, RecordCategory } from "@/app/lib/records";

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

export const demoKpis: DemoKpi[] = [
    { label: "걸음수", category: "steps", valueText: "6,300걸음", subText: "최근" },
    { label: "수면",   category: "sleep", valueText: "6시간",  subText: "최근" },
    { label: "기분",   category: "mood",  valueText: "3.2점",    subText: "7일 평균" },
    { label: "공황",   category: "panic", valueText: "2회",      subText: "7일 발생" },
];  

export const demoRecords: DemoRecord[] = [
    { id: "s6", date: "2026-01-11", category: "steps", title: "Steps", valueText: "6,300" },
    { id: "sl6", date: "2026-01-11", category: "sleep", title: "Sleep", valueText: "6.0h", note: "Short nap" },
    { id: "m6", date: "2026-01-11", category: "mood", title: "Mood", valueText: "3.0", note: "So-so" },
    { id: "p2", date: "2026-01-10", category: "panic", title: "Panic", valueText: "1 event", note: "Breathing helped" },
    { id: "s5", date: "2026-01-10", category: "steps", title: "Steps", valueText: "8,600" },
    { id: "sl5", date: "2026-01-10", category: "sleep", title: "Sleep", valueText: "7.1h" },
];
