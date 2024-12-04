import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

function DejarDeUsar({
  isOpen,
  onOpenChange,
  recurso,
  fetch,
}: {
  isOpen: any;
  onOpenChange: any;
  recurso: any;
  fetch: () => void;
}) {
  return (
    <>
      {recurso && (
        <DejarDeUsarModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          recurso={recurso}
          fetch={fetch}
        />
      )}
    </>
  );
}

export function DejarDeUsarModal({
  isOpen,
  onOpenChange,
  recurso,
  fetch,
}: {
  isOpen: any;
  onOpenChange: any;
  recurso: any;
  fetch: () => void;
}) {
  function handleDejarDeUsar() {
    axios
      .post("/api/dejarDeUsar", recurso)
      .then((response) => {
        toast.success("Ya no está usando el recurso.");
        fetch();
        onOpenChange();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, { id: "t" });
      });
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader>
            ¿Está seguro que desea dejar de usar el recurso "{recurso.nombre}"?
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDejarDeUsar}>
              Dejar de usar
            </Button>
            <Button onPress={onOpenChange}>Cancelar</Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}

export default DejarDeUsar;
