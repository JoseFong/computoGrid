import { validarFecha, validarHoras } from "@/utils/validaciones";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

function ReservarRecurso({
  onOpenChange,
  isOpen,
  recurso,
}: {
  onOpenChange: any;
  isOpen: any;
  recurso: any;
}) {
  return (
    <>
      {recurso && (
        <ReservarRecursoModal
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          recurso={recurso}
        />
      )}
    </>
  );
}

export default ReservarRecurso;

export function ReservarRecursoModal({
  onOpenChange,
  isOpen,
  recurso,
}: {
  onOpenChange: any;
  isOpen: any;
  recurso: any;
}) {
  const [dia, setDia] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  const { data: session } = useSession();

  function handleReservar() {
    try {
      if (validarFecha(dia)) throw new Error("Ingrese una fecha válida.");

      if (validarHoras(inicio, fin))
        throw new Error("Ingrese un horario válido.");

      const data = {
        dia: dia,
        inicio: inicio,
        fin: fin,
        orgId: session?.user?.id,
        recursoId: recurso.id,
      };

      axios
        .post("/api/reservacion", data)
        .then((response) => toast.success("Reservación exitosa."))
        .catch((e) => {
          if (e.response) {
            toast.error(e.response.data.message);
          } else {
            toast.error(e.message);
          }
        });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Apartar recurso "{recurso.nombre}"</ModalHeader>
            <ModalBody>
              <label>Fecha</label>
              <input
                type="date"
                className="py-1 px-2 bg-zinc-100 rounded-md"
                value={dia}
                onChange={(e) => setDia(e.target.value)}
              />
              <label>Hora de inicio</label>
              <input
                type="time"
                className="py-1 px-2 bg-zinc-100 rounded-md"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
              />
              <label>Hora de fin</label>
              <input
                type="time"
                className="py-1 px-2 bg-zinc-100 rounded-md"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cerrar</Button>
              <Button color="primary" onPress={handleReservar}>
                Reservar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
