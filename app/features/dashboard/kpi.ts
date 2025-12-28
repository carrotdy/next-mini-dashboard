import type { HealthRecord, RecordCategory } from "@/app/lib/records";

export type DashboardKpi = {
  label: string;
  category: RecordCategory;
  valueText: string;
  subText: string;
};

const parseDate = (date: string) => new Date(`${date}T00:00:00`);

const getLatestByCategory = (all: HealthRecord[], category: RecordCategory) =>
  all
    .filter((r) => r.category === category)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())[0];

const getLastNDays = (all: HealthRecord[], days: number) => {
  if (all.length === 0) return [];

  const latestMs = all
    .map((r) => parseDate(r.date).getTime())
    .sort((a, b) => b - a)[0];

  const end = new Date(latestMs);
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));

  return all.filter((r) => {
    const t = parseDate(r.date).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });
};

const average = (nums: number[]) => {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

export const buildDashboardKpis = (
  records: HealthRecord[],
  days: number = 7
): DashboardKpi[] => {
  const lastN = getLastNDays(records, days);

  const latestSteps = getLatestByCategory(records, "steps")?.value ?? null;
  const latestSleep = getLatestByCategory(records, "sleep")?.value ?? null;

  const moodAvg = average(
    lastN.filter((r) => r.category === "mood").map((r) => r.value)
  );

  const panicCount = lastN.filter((r) => r.category === "panic").length;

  return [
    {
      label: "Steps",
      category: "steps",
      valueText: latestSteps === null ? "--" : latestSteps.toLocaleString(),
      subText: "latest",
    },
    {
      label: "Sleep",
      category: "sleep",
      valueText: latestSleep === null ? "--" : `${latestSleep}h`,
      subText: "latest",
    },
    {
      label: "Mood",
      category: "mood",
      valueText: moodAvg === null ? "--" : moodAvg.toFixed(1),
      subText: `avg (${days}d)`,
    },
    {
      label: "Panic",
      category: "panic",
      valueText: `${panicCount}`,
      subText: `events (${days}d)`,
    },
  ];
};
