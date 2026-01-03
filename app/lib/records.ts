export type RecordCategory = "steps" | "sleep" | "mood" | "panic";

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