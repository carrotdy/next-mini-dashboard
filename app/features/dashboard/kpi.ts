import type { HealthRecord, RecordCategory } from "@/app/lib/records";

export type DashboardKpi = {
  label: string;
  category: RecordCategory;
  valueText: string;
  subText: string;
};

//최근 10개 기록
const parseDateMs = (date: string) => new Date(`${date}T00:00:00`).getTime();

export const getRecentRecords = (all: HealthRecord[], limit = 10) =>
  [...all]
    .sort((a, b) => parseDateMs(b.date) - parseDateMs(a.date))
    .slice(0, limit);

const parseDate = (date: string) => new Date(`${date}T00:00:00`);

//steps, sleep 가장 최신기록
const getLatestByCategory = (all: HealthRecord[], category: RecordCategory) =>
  all
    .filter((r) => r.category === category)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())[0];

//mood, panic 데이터 중 최근 7일
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
      valueText: `${panicCount}`,
      subText: `발생 (${days}일)`,
    },
  ];
};
