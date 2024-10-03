import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const data = await req.json()
    
        const recurso =  await prisma.recurso.create({
            data:{
                nombre: data.nombre,
                username: data.username,
                Password: data.password,
                horario: data.horario,
                estado: "Disponible",
                organizacionId: parseInt(data.orgId)
            }
        })

        if(!recurso) return NextResponse.json({message:"Hubo un error al registrar el recurso."},{status:404})
        return NextResponse.json(recurso)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
    
}