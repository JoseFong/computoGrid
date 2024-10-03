"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Organizacion, Recurso } from "@prisma/client";
import Image from "next/image";
import deleteIcon from "@/imgs/deleteIcon.png";
import VerHorario from "@/Components/verHorario";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");

  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);

  const [misRecursos, setMisRecursos] = useState([]);
  const [otrosRecursos, setOtrosRecursos] = useState([]);

  const [selectedResource, setSelectedResource] = useState();

  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isHorarioOpen,
    onOpen: onHorarioOpen,
    onOpenChange: onHorarioOpenChange,
  } = useDisclosure();

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

  function eliminarRecurso(recurso: any) {
    setSelectedResource(recurso);
    onOpen();
  }

  function handleEliminarRecurso(onClose: any) {
    axios
      .delete("/api/recurso/" + selectedResource.id)
      .then((response) => {
        toast.success("Recurso eliminado exitosamente.");
        fetchMisRecursos();
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" });
        } else {
          toast.error(error.message, { id: "t" });
        }
      });
  }

  function handleVerHorario(recurso: any) {
    setSelectedResource(recurso);
    onHorarioOpen();
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
                  <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                  {misRecursos.map((recurso: Recurso) => (
                    <TableRow>
                      <TableCell>{recurso.nombre}</TableCell>
                      <TableCell>{recurso.username}</TableCell>
                      <TableCell>{recurso.Password}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleVerHorario(recurso)}
                          className="underline"
                        >
                          Ver horario
                        </button>
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
                      <TableCell>
                        <Button
                          color="danger"
                          isIconOnly
                          size="sm"
                          onPress={() => eliminarRecurso(recurso)}
                        >
                          <Image
                            className="w-5"
                            src={deleteIcon}
                            alt={"Eliminar"}
                            title="Eliminar"
                          />
                        </Button>
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
                      <TableCell>
                        <button
                          onClick={() => handleVerHorario(recurso)}
                          className="underline"
                        >
                          Ver horario
                        </button>
                      </TableCell>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Eliminar Recurso "{selectedResource.nombre}?"
              </ModalHeader>
              <ModalBody>Esta acción es permanente.</ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancelar</Button>
                <Button
                  color="danger"
                  onPress={() => handleEliminarRecurso(onClose)}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <VerHorario
        recurso={selectedResource}
        isOpen={isHorarioOpen}
        onOpenChange={onHorarioOpenChange}
      />
    </div>
  );
}

export default HomePage;
