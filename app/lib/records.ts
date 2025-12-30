export type RecordCategory = "steps" | "sleep" | "mood" | "panic";

export type HealthRecord = {
    id: string;
    date: string;
    category: RecordCategory;
    title: string;
    value: number;
    note?: string;
}

export const records: HealthRecord[] = [
    // steps
    { id: "s1", date: "2026-01-06", category: "steps", title: "Steps", value: 7200 },
    { id: "s2", date: "2026-01-07", category: "steps", title: "Steps", value: 9800 },
    { id: "s3", date: "2026-01-08", category: "steps", title: "Steps", value: 5400 },
    { id: "s4", date: "2026-01-09", category: "steps", title: "Steps", value: 11050 },
    { id: "s5", date: "2026-01-10", category: "steps", title: "Steps", value: 8600 },
    { id: "s6", date: "2026-01-11", category: "steps", title: "Steps", value: 6300 },
    { id: "s7", date: "2026-01-12", category: "steps", title: "Steps", value: 2300 },
    { id: "s8", date: "2026-01-13", category: "steps", title: "Steps", value: 8200 },
    { id: "s9", date: "2026-01-14", category: "steps", title: "Steps", value: 10300 },
    { id: "s10", date: "2026-01-15", category: "steps", title: "Steps", value: 12300 },

    // sleep 
    { id: "sl1", date: "2026-01-06", category: "sleep", title: "Sleep", value: 6.2, note: "중간에 한번 깸" },
    { id: "sl2", date: "2026-01-07", category: "sleep", title: "Sleep", value: 7.4 },
    { id: "sl3", date: "2026-01-08", category: "sleep", title: "Sleep", value: 5.9, note: "늦게 잠" },
    { id: "sl4", date: "2026-01-09", category: "sleep", title: "Sleep", value: 6.8 },
    { id: "sl5", date: "2026-01-10", category: "sleep", title: "Sleep", value: 7.1 },
    { id: "sl6", date: "2026-01-11", category: "sleep", title: "Sleep", value: 6.0, note: "낮잠 짧게 잠" },
    { id: "sl7", date: "2026-01-12", category: "sleep", title: "Sleep", value: 5.2 },
    { id: "sl8", date: "2026-01-13", category: "sleep", title: "Sleep", value: 5.6 },
    { id: "sl9", date: "2026-01-14", category: "sleep", title: "Sleep", value: 7.0 },
    { id: "sl10", date: "2026-01-15", category: "sleep", title: "Sleep", value: 8.2, note: "안깨고 푹 잠"},

    // mood
    { id: "m1", date: "2026-01-06", category: "mood", title: "Mood", value: 3, note: "그냥저냥" },
    { id: "m2", date: "2026-01-07", category: "mood", title: "Mood", value: 4, note: "기분 좋음" },
    { id: "m3", date: "2026-01-08", category: "mood", title: "Mood", value: 2, note: "피곤함" },
    { id: "m4", date: "2026-01-09", category: "mood", title: "Mood", value: 3, note: "보통" },
    { id: "m5", date: "2026-01-10", category: "mood", title: "Mood", value: 5, note: "최고 좋음" },
    { id: "m6", date: "2026-01-11", category: "mood", title: "Mood", value: 3, note: "보통" },

    // panic 
    { id: "p1", date: "2026-01-07", category: "panic", title: "Panic", value: 1, note: "5분" },
    { id: "p2", date: "2026-01-10", category: "panic", title: "Panic", value: 1 },
    { id: "p3", date: "2026-01-12", category: "panic", title: "Panic", value: 1 },
    { id: "p4", date: "2026-01-16", category: "panic", title: "Panic", value: 1, note: "호흡으로 진정됨" },
    { id: "p5", date: "2026-01-18", category: "panic", title: "Panic", value: 1 },
];

export const categoryLabel: Record<RecordCategory, string> = {
  steps: "걸음수",
  sleep: "수면",
  mood: "기분",
  panic: "공황",
};

export type DemoKpi = {
  label: string;
  category: RecordCategory;
  valueText: string;
  subText: string;
};

export type DemoRecord = {
  id: string;
  date: string;
  category: RecordCategory;
  title: string;
  valueText: string;
  note?: string;
};