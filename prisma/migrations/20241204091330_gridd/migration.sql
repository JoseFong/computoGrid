-- CreateTable
CREATE TABLE "Organizacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Recurso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "orgUsandola" INTEGER,
    "reservacion" INTEGER,
    "log" INTEGER,
    CONSTRAINT "Recurso_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" TEXT NOT NULL,
    "inicio" TEXT NOT NULL,
    "fin" TEXT NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "recursoId" INTEGER NOT NULL,
    "reservacionId" INTEGER,
    CONSTRAINT "Log_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_reservacionId_fkey" FOREIGN KEY ("reservacionId") REFERENCES "Reservacion" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dia" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "recursoId" INTEGER NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    CONSTRAINT "Reservacion_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservacion_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
