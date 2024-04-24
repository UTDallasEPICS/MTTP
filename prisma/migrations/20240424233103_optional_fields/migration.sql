-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
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
    CONSTRAINT "Student_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("authorId", "birthDay", "city", "county", "dateCreated", "firstName", "id", "lastName", "phoneNumber", "schoolName", "streetAddress", "streetNumber", "studentEmail", "updatedAt", "voted", "zipCode") SELECT "authorId", "birthDay", "city", "county", "dateCreated", "firstName", "id", "lastName", "phoneNumber", "schoolName", "streetAddress", "streetNumber", "studentEmail", "updatedAt", "voted", "zipCode" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
