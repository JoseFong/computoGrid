"use client"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  useDisclosure,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Organizacion, Recurso } from "@prisma/client"
import Image from "next/image"
import deleteIcon from "@/imgs/deleteIcon.png"
import VerHorario from "@/Components/verHorario"
import { useSession } from "next-auth/react"
import ReservarRecurso from "@/Components/reservarRecurso"
import VerReservaciones from "@/Components/verReservaciones"
import UsarRecurso from "@/Components/usarRecurso"
import PlusIcon from "@/Components/ui/PlusIcon"
import ActionBar from "@/Components/ActionBar"

function HomePage() {
  const [loadingMyRes, setLoadingMyRes] = useState(true)
  const [loadingOtherRes, setLoadingOtherRes] = useState(true)
  const [loadingOrg, setLoadingOrg] = useState(true)
  const { data: session } = useSession()
  const orgName = session?.user?.name ?? ""
  const orgId = session?.user?.id ?? ""

  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([])

  const [misRecursos, setMisRecursos] = useState([])
  const [otrosRecursos, setOtrosRecursos] = useState([])

  const [selectedResource, setSelectedResource] = useState()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isHorarioOpen,
    onOpen: onHorarioOpen,
    onOpenChange: onHorarioOpenChange,
  } = useDisclosure()
  const {
    isOpen: isResOpen,
    onOpen: onResOpen,
    onOpenChange: onResOpenChange,
  } = useDisclosure()

  const {
    isOpen: isVROpen,
    onOpen: onVROpen,
    onOpenChange: onVROpenChange,
  } = useDisclosure()

  const {
    isOpen: isUsOpen,
    onOpen: onUsOpen,
    onOpenChange: onUsOpenChange,
  } = useDisclosure()

  useEffect(() => {
    if (orgId !== "") {
      fetchMisRecursos()
      fetchRecursosOtros()
      fetchOrganizaciones()
    }
  }, [orgId])

  async function fetchOrganizaciones() {
    axios
      .get("/api/organizacion")
      .then((response) => {
        setOrganizaciones(response.data)
        setLoadingOrg(false)
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" })
        } else {
          toast.error(error.message, { id: "t" })
        }
      })
  }

  async function fetchMisRecursos() {
    axios
      .get("/api/recursosMios/" + orgId)
      .then((response) => {
        setMisRecursos(response.data)
        setLoadingMyRes(false)
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" })
        } else {
          toast.error(error.message, { id: "t" })
        }
      })
  }

  async function fetchRecursosOtros() {
    axios
      .get("/api/recursosDeOtros/" + orgId)
      .then((response) => {
        setOtrosRecursos(response.data)
        setLoadingOtherRes(false)
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" })
        } else {
          toast.error(error.message, { id: "t" })
        }
      })
  }
  function getOrgName(id: number) {
    const org: Organizacion = organizaciones.find(
      (org: Organizacion) => org.id === id
    )
    if (org) return org.nombre
    return "Desconocido"
  }

  function eliminarRecurso(recurso: any) {
    setSelectedResource(recurso)
    onOpen()
  }

  function handleEliminarRecurso(onClose: any) {
    axios
      .delete("/api/recurso/" + selectedResource.id)
      .then((response) => {
        toast.success("Recurso eliminado exitosamente.")
        fetchMisRecursos()
        onClose()
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, { id: "t" })
        } else {
          toast.error(error.message, { id: "t" })
        }
      })
  }

  function handleVerHorario(recurso: any) {
    setSelectedResource(recurso)
    onHorarioOpen()
  }

  function handleReservarRecurso(recurso: any) {
    setSelectedResource(recurso)
    onResOpen()
  }

  function handleVerReservaciones(recurso: any) {
    setSelectedResource(recurso)
    onVROpen()
  }

  function usarRecurso(recurso: any) {
    setSelectedResource(recurso)
    onUsOpen()
  }

  return (
    <div>
      <ActionBar />
      <div className="flex items-center gap-5 min-h-screen w-screen flex-col py-10 px-5">
        <h1 className="text-xl font-bold">Bienvenido, {orgName}</h1>
        <Tabs aria-label="Recursos de la organización" color="primary">
          <Tab key="misRecursos" title="Mis Recursos">
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-bold mb-5">Mis recursos</h2>

              <Table>
                <TableHeader>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Usuario</TableColumn>
                  <TableColumn>Contraseña</TableColumn>
                  <TableColumn>Horario</TableColumn>
                  <TableColumn>Reservaciones</TableColumn>
                  <TableColumn>Estado</TableColumn>
                  <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody
                  isLoading={loadingMyRes}
                  loadingContent={<Spinner />}
                >
                  {misRecursos.map((recurso: Recurso) => (
                    <TableRow key={recurso.id}>
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
                        <button
                          className="underline"
                          onClick={() => handleVerReservaciones(recurso)}
                        >
                          Ver reservaciones
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
          </Tab>
          <Tab key="otrosRecursos" title="Otros recursos">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mb-5">Otros recursos</h1>
              <Table>
                <TableHeader>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Horario</TableColumn>
                  <TableColumn>Propietario</TableColumn>
                  <TableColumn>Estado</TableColumn>
                  <TableColumn>Ver Reservaciones</TableColumn>
                  <TableColumn>Reservar</TableColumn>
                  <TableColumn>Usar</TableColumn>
                </TableHeader>
                <TableBody
                  isLoading={loadingOtherRes || loadingOrg}
                  loadingContent={<Spinner />}
                >
                  {otrosRecursos.map((recurso: Recurso) => (
                    <TableRow key={recurso.id}>
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
                      <TableCell>
                        <button
                          className="underline"
                          onClick={() => handleVerReservaciones(recurso)}
                        >
                          Ver reservaciones
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="underline"
                          onClick={() => handleReservarRecurso(recurso)}
                        >
                          Reservar
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="underline"
                          onClick={() => usarRecurso(recurso)}
                        >
                          Usar
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tab>
        </Tabs>
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
        <ReservarRecurso
          onOpenChange={onResOpenChange}
          isOpen={isResOpen}
          recurso={selectedResource}
        />
        <VerReservaciones
          isOpen={isVROpen}
          onOpenChange={onVROpenChange}
          recurso={selectedResource}
        />
        <UsarRecurso
          recurso={selectedResource}
          id={orgId}
          isOpen={isUsOpen}
          onOpenChange={onUsOpenChange}
        />
      </div>
    </div>
  )
}

export default HomePage
