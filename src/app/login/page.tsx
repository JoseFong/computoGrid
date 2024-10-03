"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { textoVacio } from "@/utils/validaciones";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function login() {
    try {
      if (textoVacio(username) || textoVacio(password))
        throw new Error("Complete todos los campos.");

      const data = {
        username: username,
        password: password,
      };

      axios
        .post("/api/login", data)
        .then((response) => {
          toast.success("Inicio de sesión exitoso.", { id: "t" });
          localStorage.setItem("usernameGrid", response.data.message);
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

  function registrar() {
    router.push("/registro");
  }

  return (
    <div className="w-screen h-screen bg-zinc-200 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-xl flex flex-col gap-4">
        <h1 className="text-lg font-bold">Iniciar Sesión</h1>
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
        <div className="flex flex-col gap-1">
          <Button color="primary" onPress={login}>
            Iniciar Sesión
          </Button>
          <button className="text-sm underline" onClick={registrar}>
            Registrar organización
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
