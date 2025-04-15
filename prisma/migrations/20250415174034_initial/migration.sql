-- CreateTable
CREATE TABLE "students" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "streetNumber" INTEGER DEFAULT 0,
    "streetAddress" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "voted" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "phoneNumber" TEXT,
    "studentEmail" TEXT,
    "schoolName" TEXT NOT NULL,
    "birthDay" TEXT NOT NULL,
    CONSTRAINT "students_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
