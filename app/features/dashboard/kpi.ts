import type { Record as DbRecord, RecordCategory } from "@prisma/client";

export type DashboardKpi = {
  label: string;
  category: RecordCategory;
  valueText: string;
  subText: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;


export const getRecentRecords = (all: DbRecord[], limit = 10) =>
  [...all]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);

const getLatestByCategory = (all: DbRecord[], category: RecordCategory) => {
  if (!Array.isArray(all)) return undefined;
  
  let latest: DbRecord | undefined;

  for (const r of all) {
    if (r.category !== category) continue;
    if (!latest || r.date.getTime() > latest.date.getTime()) latest = r;
  }

  return latest;
};

const getLastNDays = (all: DbRecord[], days: number) => {
  if (all.length === 0) return [];

  const endMs = all.reduce((max, r) => Math.max(max, r.date.getTime()), -Infinity);
  const startMs = endMs - (days - 1) * DAY_MS;

  return all.filter((r) => {
    const t = r.date.getTime();
    return t >= startMs && t <= endMs;
  });
};

const average = (nums: number[]) => {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

export const buildDashboardKpis = (
  records: DbRecord[],
  days: number = 7
): DashboardKpi[] => {
  const latestSteps = getLatestByCategory(records, "steps")?.value ?? null;
  const latestSleep = getLatestByCategory(records, "sleep")?.value ?? null;

  const moodLastN = getLastNDays(
    records.filter((r) => r.category === "mood"),
    days
  );

  const panicLastN = getLastNDays(
    records.filter((r) => r.category === "panic"),
    days
  );

  const moodAvg = average(moodLastN.map((r) => r.value));
  const panicCount = panicLastN.length;

  return [
    {
      label: "걸음수",
      category: "steps",
      valueText: latestSteps === null ? "--" : latestSteps.toLocaleString(),
      subText: "최근 기록",
    },
    {
      label: "수면",
      category: "sleep",
      valueText: latestSleep === null ? "--" : `${latestSleep.toFixed(0)}h`,
      subText: "최근 기록",
    },
    {
      label: "기분",
      category: "mood",
      valueText: moodAvg === null ? "--" : moodAvg.toFixed(0),
      subText: `평균 (${days}일)`,
    },
    {
      label: "공황",
      category: "panic",
      valueText: moodAvg === null ? "--" : `${panicCount}`,
      subText: `발생 (${days}일)`,
    },
  ];
};
