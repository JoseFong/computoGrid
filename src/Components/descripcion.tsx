import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

function Descripcion({
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
        <DescripcionModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          recurso={recurso}
        />
      )}
    </>
  );
}

export function DescripcionModal({
  isOpen,
  onOpenChange,
  recurso,
}: {
  isOpen: any;
  onOpenChange: any;
  recurso: any;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Detalles del recurso "{recurso.nombre}"</ModalHeader>
            <ModalBody>{recurso.descripcion}</ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cerrar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default Descripcion;
