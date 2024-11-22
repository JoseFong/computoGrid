import { Button } from "@nextui-org/react"
import { signOut } from "next-auth/react"
import PowerOutlineIcon from "./ui/PowerOutlineIcon"
import PlusIcon from "./ui/PlusIcon"
import { useRouter } from "next/navigation"

const ActionBar = () => {
  const router = useRouter()

  function registrarRecurso() {
    router.push("/registrarRecurso")
  }

  return (
    <div className="flex justify-center w-screen h-5 fixed group bottom-0">
      <div className="absolute w-6 h-2 self-center transition-colors bg-slate-300 group-hover:bg-slate-400 rounded-md"></div>
      <div className="flex gap-2 w-fit h-fit bg-slate-100 border-slate-400 border rounded-md group-hover:-translate-y-full translate-y-full transition-transform p-2">
        <Button onPress={registrarRecurso} color="primary" isIconOnly>
          <PlusIcon />
        </Button>
        <Button onPress={() => signOut()} color="danger" isIconOnly>
          <PowerOutlineIcon />
        </Button>
      </div>
    </div>
  )
}

export default ActionBar
