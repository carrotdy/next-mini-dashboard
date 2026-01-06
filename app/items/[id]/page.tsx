import { PageContainer } from "@/app/components/layout/PageContainer";
import { TopNav } from "@/app/components/layout/TopNav";
import { formatValueText } from "@/app/lib/format";
import { prisma } from "@/app/lib/prisma";
import { categoryLabel } from "@/app/lib/records";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteRecordForm from "../components/DeleteRecordForm";
import ItemsFlashToast from "../components/ItemFlashToast";

const pillClass = (category: string) => {
    switch (category) {
        case "steps":
            return "border-sky-200 bg-sky-50 text-sky-700";
        case "sleep":
            return "border-indigo-200 bg-indigo-50 text-indigo-700";
        case "mood":
            return "border-emerald-200 bg-emerald-50 text-emerald-700";
        case "panic":
            return "border-rose-200 bg-rose-50 text-rose-700";
        default:
            return "border-zinc-200 bg-zinc-50 text-zinc-700";
    }
};

const MetaCard = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-xs font-medium text-zinc-500">{label}</div>
            <div className="mt-1 text-sm font-semibold text-zinc-900">{value}</div>
        </div>
    );
};

export default async function ItemDetailPage({
    params
}: {
    params: { id: string };
}) {
    const record = await prisma.record.findUnique({
        where: { id: params.id }
    });

    if (!record) notFound();

    const categoryText = categoryLabel[record.category] ?? record.category;
    const valueText = formatValueText(record.category, record.value);

    const dtf = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const formatDate = (d: Date) => dtf.format(d);

    return (
        <PageContainer>
            <ItemsFlashToast />
            <TopNav title="기록 상세" />

            <div className="px-6 pb-12 pt-6">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="text-xs font-medium text-zinc-500">
                                    {formatDate(record.date)}
                                </div>
                                <div className="mt-1 text-2xl font-bold text-zinc-900">
                                    {record.title}
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span
                                        className={[
                                            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                                            pillClass(record.category),
                                        ].join(" ")}
                                    >
                                        {categoryText}
                                    </span>
                                </div>
                            </div>

                            <div className="grid w-full grid-cols-2 gap-3 sm:w-[320px] sm:grid-cols-1">
                                <MetaCard label="카테고리" value={categoryText} />
                                <MetaCard label="수치" value={valueText} />
                            </div>
                        </div>

                        <div className="my-6 h-px bg-zinc-100" />

                        <div>
                            <div className="text-sm font-semibold text-zinc-900">메모</div>
                            <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                                {record.note?.trim() ? (
                                    <div className="whitespace-pre-wrap">{record.note}</div>
                                ) : (
                                    <span className="text-zinc-400">메모가 없어요.</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                        <Link
                            href={`/items/${record.id}/edit`}
                            className="rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                        >
                            수정
                        </Link>

                        <DeleteRecordForm id={record.id} />

                        <Link
                            href="/items"
                            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                        >
                            목록으로
                        </Link>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
