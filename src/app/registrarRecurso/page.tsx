"use client";
import { textoVacio, validarHoras } from "@/utils/validaciones";
import { Button, Checkbox, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function RegistrarRecurso() {
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState("");

  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  const [hilunes, setHilunes] = useState("");
  const [hflunes, setHflunes] = useState("");
  const [himartes, setHimartes] = useState("");
  const [hfmartes, setHfmartes] = useState("");
  const [himiercoles, setHimiercoles] = useState("");
  const [hfmiercoles, setHfmiercoles] = useState("");
  const [hijueves, setHijueves] = useState("");
  const [hfjueves, setHfjueves] = useState("");
  const [hiviernes, setHiviernes] = useState("");
  const [hfviernes, setHfviernes] = useState("");
  const [hisabado, setHisabado] = useState("");
  const [hfsabado, setHfsabado] = useState("");
  const [hidomingo, setHidomingo] = useState("");
  const [hfdomingo, setHfdomingo] = useState("");

  const router = useRouter();

  useEffect(() => {
    const usdata = localStorage.getItem("usernameGrid");
    if (!usdata || usdata === "") {
      router.push("/login");
    } else {
      setOrgId(usdata);
      setLoading(false);
    }
  }, []);

  function cancelar() {
    router.push("/");
  }

  function registrar() {
    try {
      if (
        textoVacio(nombre) ||
        textoVacio(username) ||
        textoVacio(password) ||
        textoVacio(passwordConfirm)
      )
        throw new Error("Complete todos los campos.");

      if (password !== passwordConfirm)
        throw new Error("Las contraseñas no concuerdan.");

      if (
        !lunes &&
        !martes &&
        !miercoles &&
        !jueves &&
        !viernes &&
        !sabado &&
        !domingo
      )
        throw new Error("Seleccione por lo menos un día.");

      const horario: any = {};

      if (lunes) {
        if (textoVacio(hilunes) || textoVacio(hflunes))
          throw new Error("Ingrese horas válidas para Lunes.");
        if (validarHoras(hilunes, hflunes))
          throw new Error("Ingrese horas válidas para Lunes.");
        horario.lunes = { inicio: hilunes, fin: hflunes };
      }
      if (martes) {
        if (textoVacio(himartes) || textoVacio(hfmartes))
          throw new Error("Ingrese horas válidas para Martes.");
        if (validarHoras(himartes, hfmartes))
          throw new Error("Ingrese horas válidas para Martes.");
        horario.martes = { inicio: himartes, fin: hfmartes };
      }

      if (miercoles) {
        if (textoVacio(himiercoles) || textoVacio(hfmiercoles))
          throw new Error("Ingrese horas válidas para Miércoles.");
        if (validarHoras(himiercoles, hfmiercoles))
          throw new Error("Ingrese horas válidas para Miércoles.");
        horario.miercoles = { inicio: himiercoles, fin: hfmiercoles };
      }

      if (jueves) {
        if (textoVacio(hijueves) || textoVacio(hfjueves))
          throw new Error("Ingrese horas válidas para Jueves.");
        if (validarHoras(hijueves, hfjueves))
          throw new Error("Ingrese horas válidas para Jueves.");
        horario.jueves = { inicio: hijueves, fin: hfjueves };
      }

      if (viernes) {
        if (textoVacio(hiviernes) || textoVacio(hfviernes))
          throw new Error("Ingrese horas válidas para Viernes.");
        if (validarHoras(hiviernes, hfviernes))
          throw new Error("Ingrese horas válidas para Viernes.");
        horario.viernes = { inicio: hiviernes, fin: hfviernes };
      }

      if (sabado) {
        if (textoVacio(hisabado) || textoVacio(hfsabado))
          throw new Error("Ingrese horas válidas para Sábado.");
        if (validarHoras(hisabado, hfsabado))
          throw new Error("Ingrese horas válidas para Sábado.");
        horario.sabado = { inicio: hisabado, fin: hfsabado };
      }

      if (domingo) {
        if (textoVacio(hidomingo) || textoVacio(hfdomingo))
          throw new Error("Ingrese horas válidas para Domingo.");
        if (validarHoras(hidomingo, hfdomingo))
          throw new Error("Ingrese horas válidas para Domingo.");
        horario.domingo = { inicio: hidomingo, fin: hfdomingo };
      }

      const horarioString = JSON.stringify(horario);

      const data = {
        nombre: nombre,
        username: username,
        password: password,
        horario: horarioString,
        orgId: orgId,
      };

      axios
        .post("/api/recurso", data)
        .then((response) => {
          toast.success("Recurso registrado exitosamente.", { id: "t" });
          router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message, { id: "t" });
          } else {
            toast.error(error.message, { id: "t" });
          }
        });
    } catch (e: any) {
      toast.error(e.message, { id: "t" });
    }
  }

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center flex-col gap-5">
          <h1 className="text-xl font-bold">Registrar recurso</h1>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3 w-80">
              <Input
                type="text"
                placeholder="Nombre"
                label="Nombre del recurso"
                labelPlacement="outside"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Nombre de usuario"
                label="Nombre de usuario"
                labelPlacement="outside"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                label="Contraseña"
                labelPlacement="outside"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                label="Confirmar contraseña"
                labelPlacement="outside"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <p className="text-center text-sm">
                (El nombre de usuario y contraseña son las que se asignan al
                usuario creado en Radmin Server)
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <table>
                <thead>
                  <th colSpan={2}>Dia</th>
                  <th>Hora de inicio</th>
                  <th>Hora de fin</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Lunes</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setLunes(!lunes)}
                          isSelected={lunes}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!lunes}
                          onChange={(e) => setHilunes(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!lunes}
                          onChange={(e) => setHflunes(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Martes</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setMartes(!martes)}
                          isSelected={martes}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!martes}
                          onChange={(e) => setHimartes(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!martes}
                          onChange={(e) => setHfmartes(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Miércoles</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setMiercoles(!miercoles)}
                          isSelected={miercoles}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!miercoles}
                          onChange={(e) => setHimiercoles(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!miercoles}
                          onChange={(e) => setHfmiercoles(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Jueves</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setJueves(!jueves)}
                          isSelected={jueves}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!jueves}
                          onChange={(e) => setHijueves(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!jueves}
                          onChange={(e) => setHfjueves(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Viernes</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setViernes(!viernes)}
                          isSelected={viernes}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!viernes}
                          onChange={(e) => setHiviernes(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!viernes}
                          onChange={(e) => setHfviernes(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Sábado</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setSabado(!sabado)}
                          isSelected={sabado}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!sabado}
                          onChange={(e) => setHisabado(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!sabado}
                          onChange={(e) => setHfsabado(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <label>Domingo</label>
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <Checkbox
                          onChange={() => setDomingo(!domingo)}
                          isSelected={domingo}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!domingo}
                          onChange={(e) => setHidomingo(e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-2 flex items-center justify-center">
                        <input
                          type="time"
                          disabled={!domingo}
                          onChange={(e) => setHfdomingo(e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button onPress={registrar}>Registrar</Button>
            <Button color="danger" onPress={cancelar}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrarRecurso;
