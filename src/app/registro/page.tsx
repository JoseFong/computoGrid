"use client";
import { textoVacio } from "@/utils/validaciones";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Registro() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  function register() {
    try {
      if (
        textoVacio(username) ||
        textoVacio(password) ||
        textoVacio(passwordConfirm)
      )
        throw new Error("Complete todos los campos.");

      if (password !== passwordConfirm)
        throw new Error("Las contraseñas no coinciden.");

      const data = {
        nombre: name,
        username: username,
        password: password,
      };

      axios
        .post("/api/organizacion", data)
        .then((response) => {
          toast.success(response.data.message, { id: "t" });
          router.push("/login");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else toast.error(error.message);
        });
    } catch (e: any) {
      toast.error(e.message, { id: "t" });
    }
  }

  return (
    <div className="w-screen h-screen bg-zinc-200 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-xl flex flex-col gap-4">
        <h1 className="text-lg font-bold">Registrar organización</h1>
        <Input
          label="Nombre de la organización"
          labelPlacement="outside"
          placeholder="Nombre"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Usuario"
          labelPlacement="outside"
          placeholder="Usuario"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Contraseña"
          labelPlacement="outside"
          placeholder="Contraseña"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirmar contraseña"
          labelPlacement="outside"
          placeholder="Contraseña"
          value={passwordConfirm}
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <Button color="primary" onPress={register}>
            Registrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Registro;
