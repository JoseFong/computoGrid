"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function VerHorario({
  recurso,
  isOpen,
  onOpenChange,
}: {
  recurso: any;
  isOpen: any;
  onOpenChange: any;
}) {
  return (
    <>
      {recurso && (
        <ModalHorario
          recurso={recurso}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
}
export default VerHorario;

export function ModalHorario({
  recurso,
  isOpen,
  onOpenChange,
}: {
  recurso: any;
  isOpen: any;
  onOpenChange: any;
}) {
  interface Dia {
    nombre: string;
    inicio: string;
    fin: string;
  }

  const [horario, setHorario] = useState<Dia[]>([]);

  useEffect(() => {
    let dias: Dia[] = [];
    const hor = JSON.parse(recurso.horario);

    if (hor.lunes) {
      const dia: Dia = {
        nombre: "Lunes",
        inicio: hor.lunes.inicio,
        fin: hor.lunes.fin,
      };
      dias.push(dia);
    }
    if (hor.martes) {
      const dia: Dia = {
        nombre: "Martes",
        inicio: hor.martes.inicio,
        fin: hor.martes.fin,
      };
      dias.push(dia);
    }

    if (hor.miercoles) {
      const dia: Dia = {
        nombre: "Miércoles",
        inicio: hor.miercoles.inicio,
        fin: hor.miercoles.fin,
      };
      dias.push(dia);
    }

    if (hor.jueves) {
      const dia: Dia = {
        nombre: "Jueves",
        inicio: hor.jueves.inicio,
        fin: hor.jueves.fin,
      };
      dias.push(dia);
    }

    if (hor.viernes) {
      const dia: Dia = {
        nombre: "Viernes",
        inicio: hor.viernes.inicio,
        fin: hor.viernes.fin,
      };
      dias.push(dia);
    }

    if (hor.sabado) {
      const dia: Dia = {
        nombre: "Sábado",
        inicio: hor.sabado.inicio,
        fin: hor.sabado.fin,
      };
      dias.push(dia);
    }

    if (hor.domingo) {
      const dia: Dia = {
        nombre: "Domingo",
        inicio: hor.domingo.inicio,
        fin: hor.domingo.fin,
      };
      dias.push(dia);
    }
    setHorario(dias);
  }, [recurso, onOpenChange]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Horario del recurso "{recurso.nombre}"
            </ModalHeader>
            <ModalBody>
              <table>
                <thead>
                  <th className="border-1 border-black p-1">Día</th>
                  <th className="border-1 border-black p-1">Inicio</th>
                  <th className="border-1 border-black p-1">Fin</th>
                </thead>
                <tbody>
                  {horario.map((h: Dia) => (
                    <tr>
                      <td className="border-1 border-black p-1">{h.nombre}</td>
                      <td className="border-1 border-black p-1">{h.inicio}</td>
                      <td className="border-1 border-black p-1">{h.fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
