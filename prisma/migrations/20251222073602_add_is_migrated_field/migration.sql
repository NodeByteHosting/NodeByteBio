-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isMigrated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;
