/*
  Warnings:

  - You are about to drop the column `dia` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `horaFin` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `horaInicio` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `nombreOcupante` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `nombrePropietario` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `nombreRecurso` on the `Log` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "organizacionId" INTEGER NOT NULL,
    "recursoId" INTEGER NOT NULL,
    CONSTRAINT "Log_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("id", "organizacionId", "recursoId") SELECT "id", "organizacionId", "recursoId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
