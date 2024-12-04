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
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerLogs({
  isOpen,
  onOpenChange,
}: {
  isOpen: any;
  onOpenChange: any;
}) {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [recs, setRecs] = useState([]);
  const [orgs, setOrgs] = useState([]);

  function fetchLogs() {
    axios
      .get("/api/logs")
      .then((response) => {
        setLogs(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, { id: "t" });
      });
  }

  function fetchOrgs() {
    axios
      .get("/api/organizacion")
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, { id: "t" });
      });
  }

  function fetchRecs() {
    axios
      .get("/api/recurso")
      .then((response) => {
        setRecs(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, { id: "t" });
      });
  }

  useEffect(() => {
    if (logs && recs && orgs) {
      setLoading(false);
    }
  }, [logs, recs, orgs]);

  useEffect(() => {
    setLoading(true);
    fetchLogs();
    fetchOrgs();
    fetchRecs();
  }, [onOpenChange, isOpen]);

  function getOrgName(id: any) {
    const org = orgs.find((r: any) => r.id === id);
    if (org) return org?.nombre;
    return "No encontrado";
  }

  function getRecName(id: any) {
    const rec = recs.find((r: any) => r.id === id);
    if (rec) return rec?.nombre;
    return "No encontrado";
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Logs de uso</ModalHeader>
            <ModalBody>
              {loading ? (
                <Spinner size="lg" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableColumn>Recurso</TableColumn>
                    <TableColumn>Ocupante</TableColumn>
                    <TableColumn>Dia</TableColumn>
                    <TableColumn>Hora de inicio</TableColumn>
                    <TableColumn>Hora de fin</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log: any) => (
                      <TableRow>
                        <TableCell>{getRecName(log.recursoId)}</TableCell>
                        <TableCell>{getOrgName(log.organizacionId)}</TableCell>
                        <TableCell>{log.fecha}</TableCell>
                        <TableCell>{log.inicio}</TableCell>
                        <TableCell>
                          {log.fin == "ACT" ? <>En curso..</> : <>{log.fin}</>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
