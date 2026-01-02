import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const count = await prisma.record.count();
  const rows = await prisma.record.findMany({ take: 5, orderBy: { createdAt: "desc" } });

  console.log("count =", count);
  console.log(rows);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
