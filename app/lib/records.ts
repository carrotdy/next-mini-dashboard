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

    // sleep 
    { id: "sl1", date: "2026-01-06", category: "sleep", title: "Sleep", value: 6.2, note: "Woke up once" },
    { id: "sl2", date: "2026-01-07", category: "sleep", title: "Sleep", value: 7.4 },
    { id: "sl3", date: "2026-01-08", category: "sleep", title: "Sleep", value: 5.9, note: "Late bedtime" },
    { id: "sl4", date: "2026-01-09", category: "sleep", title: "Sleep", value: 6.8 },
    { id: "sl5", date: "2026-01-10", category: "sleep", title: "Sleep", value: 7.1 },
    { id: "sl6", date: "2026-01-11", category: "sleep", title: "Sleep", value: 6.0, note: "Short nap" },

    // mood
    { id: "m1", date: "2026-01-06", category: "mood", title: "Mood", value: 3, note: "Okay" },
    { id: "m2", date: "2026-01-07", category: "mood", title: "Mood", value: 4, note: "Good" },
    { id: "m3", date: "2026-01-08", category: "mood", title: "Mood", value: 2, note: "Tired" },
    { id: "m4", date: "2026-01-09", category: "mood", title: "Mood", value: 3, note: "Normal" },
    { id: "m5", date: "2026-01-10", category: "mood", title: "Mood", value: 5, note: "Great" },
    { id: "m6", date: "2026-01-11", category: "mood", title: "Mood", value: 3, note: "So-so" },

    // panic 
    { id: "p1", date: "2026-01-07", category: "panic", title: "Panic", value: 1, note: "Mild, 5min" },
    { id: "p2", date: "2026-01-10", category: "panic", title: "Panic", value: 1, note: "Short, breathing helped" },
];