import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Reservacion } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function VerReservaciones({
  isOpen,
  onOpenChange,
  recurso,
}: {
  isOpen: any;
  onOpenChange: any;
  recurso: any;
}) {
  return (
    <>
      {recurso && (
        <VerReservacionesModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          recurso={recurso}
        />
      )}
    </>
  );
}

export default VerReservaciones;

export function VerReservacionesModal({
  isOpen,
  onOpenChange,
  recurso,
}: {
  isOpen: any;
  onOpenChange: any;
  recurso: any;
}) {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [organizaciones, setOrganizaciones] = useState([]);

  useEffect(() => {
    setReservaciones([]);
    setLoading(true);
    fetchOrgs();
    fetchReservaciones();
    setLoading(false);
  }, [onOpenChange]);

  function fetchOrgs() {
    axios
      .get("/api/organizacion")
      .then((response) => {
        setOrganizaciones(response.data);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.message);
        }
      });
  }

  function fetchReservaciones() {
    axios
      .get("/api/reservacionPorRecurso/" + recurso.id)
      .then((response) => {
        setReservaciones(response.data);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.message);
        }
      });
  }

  function getOrgName(id: any) {
    const idNum = parseInt(id);
    const org = organizaciones.find(
      (organizacion: any) => organizacion.id === id
    );
    if (org) return org?.nombre;
    return "Desconocido.";
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Reservaciones del recurso "{recurso.nombre}"
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <Spinner size="lg" />
              ) : (
                <>
                  {reservaciones.length === 0 ? (
                    <div>No existen reservaciones de este recurso.</div>
                  ) : (
                    <table>
                      <thead>
                        <th className="border-1 border-black p-1">
                          Organización
                        </th>
                        <th className="border-1 border-black p-1">Fecha</th>
                        <th className="border-1 border-black p-1">
                          Hora Inicio
                        </th>
                        <th className="border-1 border-black p-1">Hora Fin</th>
                      </thead>
                      <tbody>
                        {reservaciones.map((res: any) => (
                          <tr>
                            <td className="border-1 border-black p-1">
                              {getOrgName(res.organizacionId)}
                            </td>
                            <td className="border-1 border-black p-1">
                              {res.dia}
                            </td>
                            <td className="border-1 border-black p-1">
                              {res.horaInicio}
                            </td>
                            <td className="border-1 border-black p-1">
                              {res.horaFin}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cerrar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
