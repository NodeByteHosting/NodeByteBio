-- CreateEnum
CREATE TYPE "ServerStatus" AS ENUM ('INSTALLING', 'INSTALL_FAILED', 'SUSPENDED', 'RESTORING_BACKUP', 'RUNNING', 'OFFLINE', 'STARTING', 'STOPPING');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastSyncedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "locations" (
    "id" INTEGER NOT NULL,
    "shortCode" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fqdn" TEXT NOT NULL,
    "scheme" TEXT NOT NULL DEFAULT 'https',
    "behindProxy" BOOLEAN NOT NULL DEFAULT false,
    "memory" BIGINT NOT NULL,
    "memoryOverallocate" INTEGER NOT NULL DEFAULT 0,
    "disk" BIGINT NOT NULL,
    "diskOverallocate" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isMaintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "daemonListenPort" INTEGER NOT NULL DEFAULT 8080,
    "daemonSftpPort" INTEGER NOT NULL DEFAULT 2022,
    "daemonBase" TEXT NOT NULL DEFAULT '/var/lib/pterodactyl/volumes',
    "locationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocations" (
    "id" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "alias" TEXT,
    "notes" TEXT,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "nodeId" INTEGER NOT NULL,
    "serverId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nests" (
    "id" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eggs" (
    "id" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "dockerImage" TEXT,
    "dockerImages" JSONB,
    "startup" TEXT,
    "configFrom" INTEGER,
    "scriptIsPrivileged" BOOLEAN NOT NULL DEFAULT false,
    "copyScriptFrom" INTEGER,
    "nestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eggs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "egg_variables" (
    "id" INTEGER NOT NULL,
    "eggId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "envVariable" TEXT NOT NULL,
    "defaultValue" TEXT,
    "userViewable" BOOLEAN NOT NULL DEFAULT true,
    "userEditable" BOOLEAN NOT NULL DEFAULT true,
    "rules" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "egg_variables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" TEXT NOT NULL,
    "pterodactylId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "uuidShort" TEXT,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ServerStatus" NOT NULL DEFAULT 'INSTALLING',
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "memory" INTEGER NOT NULL,
    "swap" INTEGER NOT NULL DEFAULT 0,
    "disk" INTEGER NOT NULL,
    "io" INTEGER NOT NULL DEFAULT 500,
    "cpu" INTEGER NOT NULL,
    "oomDisabled" BOOLEAN NOT NULL DEFAULT false,
    "databaseLimit" INTEGER NOT NULL DEFAULT 0,
    "allocationLimit" INTEGER NOT NULL DEFAULT 0,
    "backupLimit" INTEGER NOT NULL DEFAULT 0,
    "startup" TEXT,
    "image" TEXT,
    "featureLimits" JSONB,
    "ownerId" TEXT NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "eggId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "installedAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_variables" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "variableId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "server_variables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_databases" (
    "id" INTEGER NOT NULL,
    "serverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 3306,
    "maxConnections" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "server_databases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_backups" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ignoredFiles" JSONB,
    "sha256Hash" TEXT,
    "bytes" BIGINT NOT NULL DEFAULT 0,
    "isSuccessful" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "server_backups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "itemsTotal" INTEGER NOT NULL DEFAULT 0,
    "itemsSynced" INTEGER NOT NULL DEFAULT 0,
    "itemsFailed" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locations_shortCode_key" ON "locations"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "nodes_uuid_key" ON "nodes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "allocations_ip_port_key" ON "allocations"("ip", "port");

-- CreateIndex
CREATE UNIQUE INDEX "nests_uuid_key" ON "nests"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "eggs_uuid_key" ON "eggs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "servers_pterodactylId_key" ON "servers"("pterodactylId");

-- CreateIndex
CREATE UNIQUE INDEX "servers_uuid_key" ON "servers"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "servers_externalId_key" ON "servers"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "server_variables_serverId_variableId_key" ON "server_variables"("serverId", "variableId");

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocations" ADD CONSTRAINT "allocations_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocations" ADD CONSTRAINT "allocations_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eggs" ADD CONSTRAINT "eggs_nestId_fkey" FOREIGN KEY ("nestId") REFERENCES "nests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "egg_variables" ADD CONSTRAINT "egg_variables_eggId_fkey" FOREIGN KEY ("eggId") REFERENCES "eggs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_eggId_fkey" FOREIGN KEY ("eggId") REFERENCES "eggs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_variables" ADD CONSTRAINT "server_variables_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_variables" ADD CONSTRAINT "server_variables_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "egg_variables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_databases" ADD CONSTRAINT "server_databases_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_backups" ADD CONSTRAINT "server_backups_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
