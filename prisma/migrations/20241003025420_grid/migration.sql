/*
  Warnings:

  - You are about to drop the column `enuso` on the `Recurso` table. All the data in the column will be lost.
  - Added the required column `estado` to the `Recurso` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recurso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    CONSTRAINT "Recurso_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recurso" ("Password", "horario", "id", "nombre", "organizacionId", "username") SELECT "Password", "horario", "id", "nombre", "organizacionId", "username" FROM "Recurso";
DROP TABLE "Recurso";
ALTER TABLE "new_Recurso" RENAME TO "Recurso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
