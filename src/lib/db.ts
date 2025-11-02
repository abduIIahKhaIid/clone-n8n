import { PrismaClient } from "@/generated/prisma/client";
import { de } from "date-fns/locale";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export default prisma;