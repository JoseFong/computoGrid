"use client"

import { Button, Image, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import { EyeSlashFilledIcon } from "@/Components/ui/EyeSlashFilledIcon"
import { EyeFilledIcon } from "@/Components/ui/EyeFilledIcon"
import { authenticate, AuthState } from "@/libs/actions"
import { UserFilledIcon } from "@/Components/ui/UserFilledIcon"
import { KeyFilledIcon } from "@/Components/ui/KeyFilledIcon"
import escudoUABC from "@/imgs/UABC_escudo_SER-PNG.png"
import { signIn, useSession } from "next-auth/react"

function Login() {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggleVisibility = () => setIsPassVisible(!isPassVisible)

  function registrar() {
    router.push("/registro")
  }

  const handleLogin = async (formData: FormData) => {
    setLoading(true)

    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    setLoading(false)

    if (!res) return

    if (!res.ok) {
      toast.error(res.error, { id: "error" })
      return
    }

    router.push("/")
  }

  return (
    <div className="w-screen h-screen bg-slate-200 flex items-center justify-center">
      <form
        action={handleLogin}
        className="bg-white p-5 rounded-xl shadow-xl flex flex-col gap-4"
      >
        <Image
          src={escudoUABC.src}
          alt="Escudo de la Universidad Autónoma de Baja California"
          width={60}
          radius="md"
          classNames={{
            wrapper: "self-center",
          }}
        />
        <h1 className="text-xl font-bold text-center">Portal de acceso Grid</h1>
        <Input
          name="username"
          label="Usuario"
          placeholder="Nombre de usuario"
          labelPlacement="outside"
          variant="bordered"
          isRequired
          type="text"
          startContent={<UserFilledIcon className="text-default-400 size-5" />}
        />
        <Input
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          labelPlacement="outside"
          variant="bordered"
          isRequired
          type={isPassVisible ? "text" : "password"}
          startContent={<KeyFilledIcon className="text-default-400 size-5" />}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isPassVisible ? (
                <EyeSlashFilledIcon className="size-5 text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="size-5 text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <div className="flex flex-col gap-2">
          <Button
            color="primary"
            className="font-bold"
            isLoading={loading}
            type="submit"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
          <button className="text-sm underline" onClick={registrar}>
            Registrar organización
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
