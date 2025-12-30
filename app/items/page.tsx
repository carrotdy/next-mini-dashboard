import { KpiGrid } from "@/app/components/dashboard/KpiGrid";
import { RecentRecordsTable } from "@/app/components/dashboard/RecentRecordsTable";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";

const DashboardPage = () => {
  return (
    <PageContainer>
      <TopNav title="대시보드" />
      <KpiGrid />
      <RecentRecordsTable />
    </PageContainer>
  );
};

export default DashboardPage;
