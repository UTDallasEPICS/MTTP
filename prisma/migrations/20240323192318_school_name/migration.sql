/*
  Warnings:

  - Added the required column `schoolName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL DEFAULT 0,
    "streetAddress" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "voted" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "phoneNumber" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    CONSTRAINT "Student_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("authorId", "city", "county", "dateCreated", "firstName", "lastName", "phoneNumber", "streetAddress", "streetNumber", "studentEmail", "studentId", "updatedAt", "voted", "zipCode") SELECT "authorId", "city", "county", "dateCreated", "firstName", "lastName", "phoneNumber", "streetAddress", "streetNumber", "studentEmail", "studentId", "updatedAt", "voted", "zipCode" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
