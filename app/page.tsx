import { buildDashboardKpis } from "@/app/features/dashboard/kpi";
import { records } from "@/app/lib/records";
import Link from "next/link";

export default function Home() {
  const kpis = buildDashboardKpis(records, 7);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {kpis.map((kpi) => (
          <Link
            key={kpi.category}
            href={`/items?category=${kpi.category}`}
            className="rounded-lg border p-6 hover:shadow"
          >
            <div className="text-sm opacity-70">{kpi.label}</div>
            <div className="mt-2 text-3xl font-semibold">{kpi.valueText}</div>
            <div className="mt-2 text-xs opacity-60">{kpi.subText}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
