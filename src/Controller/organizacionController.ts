import {prisma} from "@/libs/prisma"
import bcrypt from "bcryptjs"

export async function createOrganizacion(data:any){
    const hashed = await bcrypt.hash(data.password,10)
    const organizacion = await prisma.organizacion.findFirst({
        where: {
            OR: [
                {nombre:data.nombre},
                {username:data.username}
            ]
        }
    })

    if(!organizacion){
        await prisma.organizacion.create({
            data: {
                nombre: data.nombre,
                username: data.username,
                password: hashed
            }
        })
        return "registrada" 
    }else{
        return "Ya existe una organización con ese nombre o ese usuario."
    }
}