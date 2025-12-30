import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";
import { KpiGrid } from "@/app/components/dashboard/KpiGrid";
import { RecentRecordsTable } from "@/app/components/dashboard/RecentRecordsTable";
import { buildDashboardKpis, getRecentRecords } from "@/app/features/dashboard/kpi";
import { records } from "@/app/lib/records";

const DashboardPage = () => {
  const kpis = buildDashboardKpis(records, 7);
  const recent10 = getRecentRecords(records, 10);

  return (
    <PageContainer>
      <TopNav title="대시보드" />
      <KpiGrid kpis={kpis} />
      <RecentRecordsTable records={recent10} />
    </PageContainer>
  );
};

export default DashboardPage;
