import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";
import { KpiGrid } from "@/app/components/dashboard/KpiGrid";
import { RecentRecordsTable } from "@/app/components/dashboard/RecentRecordsTable";
import { demoKpis, demoRecords } from "@/app/lib/demo";

const DashboardPage = () => {
  return (
    <PageContainer>
      <TopNav title="대시보드" />
      <KpiGrid kpis={demoKpis} />
      <RecentRecordsTable records={demoRecords} />
    </PageContainer>
  );
};

export default DashboardPage;
