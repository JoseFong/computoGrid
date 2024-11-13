import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UsarRecurso({ recurso, id, isOpen, onOpenChange }) {
  return (
    <>
      {recurso && (
        <UsarRecursoModal
          recurso={recurso}
          id={id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
}

export default UsarRecurso;

export function UsarRecursoModal({ recurso, id, isOpen, onOpenChange }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [titulo, setTitulo] = useState(
    "¿Está seguro que quiere reservar el recurso?"
  );
  const [aceptado, setAceptado] = useState(false);

  // Solo se ejecutará una vez cuando el componente se monte
  useEffect(() => {
    setAceptado(false);
  }, [recurso]);

  const usar = () => {
    const data = {
      rec_id: recurso.id,
      org_id: id,
    };

    axios
      .post("/api/uso", data)
      .then((response) => {
        toast.success("Ahora está usando el recurso.");
        setPass(response.data.password);
        setUser(response.data.username);
        setAceptado(true);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, { id: "t" });
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{titulo}</ModalHeader>
          <ModalBody>
            {aceptado && (
              <>
                <p>
                  <span className="font-bold">Username: </span>
                  {user}
                </p>
                <p>
                  <span className="font-bold">Password: </span>
                  {pass}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {!aceptado && (
              <Button color="primary" onClick={usar}>
                Usar
              </Button>
            )}
            <Button onClick={onOpenChange}>Cancelar</Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
