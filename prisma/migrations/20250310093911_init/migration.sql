-- CreateTable
CREATE TABLE "Tryout" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "timeLimit" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tryout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tryoutId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tryout_title_idx" ON "Tryout"("title");

-- CreateIndex
CREATE INDEX "Tryout_createdAt_idx" ON "Tryout"("createdAt");

-- CreateIndex
CREATE INDEX "Tryout_isPublic_idx" ON "Tryout"("isPublic");

-- CreateIndex
CREATE INDEX "Question_tryoutId_idx" ON "Question"("tryoutId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_tryoutId_fkey" FOREIGN KEY ("tryoutId") REFERENCES "Tryout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
