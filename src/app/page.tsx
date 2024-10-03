"use client";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Organizacion, Recurso } from "@prisma/client";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");

  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);

  const [misRecursos, setMisRecursos] = useState([]);
  const [otrosRecursos, setOtrosRecursos] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const usdata = localStorage.getItem("usernameGrid");
    if (!usdata || usdata === "") {
      router.push("/login");
    } else {
      const name = localStorage.getItem("organizacionGrid");
      setOrgName(name);
      setOrgId(usdata);
    }
  }, []);

  function cerrarSesion() {
    localStorage.removeItem("usernameGrid");
    router.push("/login");
  }

  useEffect(() => {
    if (orgId !== "") {
      fetchMisRecursos();
      fetchRecursosOtros();
      fetchOrganizaciones();
      setLoading(false);
    }
  }, [orgId]);

  async function fetchOrganizaciones() {
    axios
      .get("/api/organizacion")
      .then((response) => {
        setOrganizaciones(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" });
        } else {
          toast.error(error.message, { id: "t" });
        }
      });
  }

  async function fetchMisRecursos() {
    axios
      .get("/api/recursosMios/" + orgId)
      .then((response) => {
        setMisRecursos(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" });
        } else {
          toast.error(error.message, { id: "t" });
        }
      });
  }

  async function fetchRecursosOtros() {
    axios
      .get("/api/recursosDeOtros/" + orgId)
      .then((response) => {
        setOtrosRecursos(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" });
        } else {
          toast.error(error.message, { id: "t" });
        }
      });
  }

  function registrarRecurso() {
    router.push("/registrarRecurso");
  }

  function getOrgName(id: number) {
    const org: Organizacion = organizaciones.find(
      (org: Organizacion) => org.id === id
    );
    if (org) return org.nombre;
    return "Desconocido";
  }

  return (
    <div className="flex items-center justify-center gap-5 min-h-screen min-w-screen flex-col">
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <h1 className="text-xl font-bold">Bienvenido, {orgName}</h1>
          <div className="flex flex-row gap-20">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">Mis recursos</h1>

              <Table>
                <TableHeader>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Usuario</TableColumn>
                  <TableColumn>Contraseña</TableColumn>
                  <TableColumn>Horario</TableColumn>
                  <TableColumn>Estado</TableColumn>
                </TableHeader>
                <TableBody>
                  {misRecursos.map((recurso: Recurso) => (
                    <TableRow>
                      <TableCell>{recurso.nombre}</TableCell>
                      <TableCell>{recurso.username}</TableCell>
                      <TableCell>{recurso.Password}</TableCell>
                      <TableCell>Ver horario</TableCell>
                      <TableCell>
                        {recurso.estado === "Disponible" ? (
                          <p className="text-green-600 font-bold">Disponible</p>
                        ) : (
                          <>
                            {recurso.estado === "Reservado" ? (
                              <p className="text-yellow-600 font-bold">
                                Reservado
                              </p>
                            ) : (
                              <p className="text-red-800 font-bold">En uso</p>
                            )}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">Otros recursos</h1>
              <Table>
                <TableHeader>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Horario</TableColumn>
                  <TableColumn>Propietario</TableColumn>
                  <TableColumn>Estado</TableColumn>
                  <TableColumn>Reservar</TableColumn>
                  <TableColumn>Usar</TableColumn>
                </TableHeader>
                <TableBody>
                  {otrosRecursos.map((recurso: Recurso) => (
                    <TableRow>
                      <TableCell>{recurso.nombre}</TableCell>
                      <TableCell>Ver horario</TableCell>
                      <TableCell>
                        {getOrgName(recurso.organizacionId)}
                      </TableCell>
                      <TableCell>
                        {recurso.estado === "Disponible" ? (
                          <p className="text-green-600 font-bold">Disponible</p>
                        ) : (
                          <>
                            {recurso.estado === "Reservado" ? (
                              <p className="text-yellow-600 font-bold">
                                Reservado
                              </p>
                            ) : (
                              <p className="text-red-800 font-bold">En uso</p>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>Reservar</TableCell>
                      <TableCell>Usar</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button onPress={registrarRecurso}>Registrar recurso</Button>
            <Button onPress={cerrarSesion}>Cerrar Sesión</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
