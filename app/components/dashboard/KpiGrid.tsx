import type { DemoKpi } from "@/app/lib/records";
import { KpiCard } from "@/app/components/dashboard/KpiCard";

export const KpiGrid = ({ kpis }: { kpis: DemoKpi[] }) => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.category} kpi={kpi} />
        ))}
      </div>
    </section>
  );
};