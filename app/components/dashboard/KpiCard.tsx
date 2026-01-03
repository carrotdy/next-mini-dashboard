import Link from "next/link";
import type { DemoKpi } from "@/app/lib/records";
import { metricMeta } from "@/app/lib/demo";

export const KpiCard = ({ kpi }: { kpi: DemoKpi }) => {
  const meta = metricMeta[kpi.category];

  return (
    <Link
      href={`/metrics/${kpi.category}`}
      className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hovsser:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-zinc-600">{kpi.label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
            {kpi.valueText}
          </div>
          <div className="mt-1 text-xs text-zinc-500">{kpi.subText}</div>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${meta.accentClass}`} />
        </div>
      </div>
    </Link>
  );
};
