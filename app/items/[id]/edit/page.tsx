import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { RecordEditForm } from "./record-edit-form";

export default async function ItemEditPage({ params }: { params: { id: string } }) {
  const record = await prisma.record.findUnique({
    where: { id: params.id }
  });
  
  if (!record) notFound();

  return (
    <PageContainer>
      <TopNav title="기록 수정" />

      <div className="px-6 pb-12 pt-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <div className="text-xl font-bold text-zinc-900">기록 수정</div>
            </div>

            <RecordEditForm record={record} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
