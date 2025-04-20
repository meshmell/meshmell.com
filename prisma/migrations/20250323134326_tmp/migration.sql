-- AlterTable
ALTER TABLE "_ModelAction" ADD CONSTRAINT "_ModelAction_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ModelAction_AB_unique";

-- AlterTable
ALTER TABLE "_ModelCategory" ADD CONSTRAINT "_ModelCategory_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ModelCategory_AB_unique";

-- AlterTable
ALTER TABLE "_ModelResolution" ADD CONSTRAINT "_ModelResolution_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ModelResolution_AB_unique";

-- AlterTable
ALTER TABLE "_SubRoleToUser" ADD CONSTRAINT "_SubRoleToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_SubRoleToUser_AB_unique";

-- CreateTable
CREATE TABLE "galleries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_models" (
    "galleryId" INTEGER NOT NULL,
    "threeDModelId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "gallery_models_pkey" PRIMARY KEY ("galleryId","threeDModelId")
);

-- CreateIndex
CREATE UNIQUE INDEX "galleries_slug_key" ON "galleries"("slug");

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_models" ADD CONSTRAINT "gallery_models_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "galleries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_models" ADD CONSTRAINT "gallery_models_threeDModelId_fkey" FOREIGN KEY ("threeDModelId") REFERENCES "threed_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
