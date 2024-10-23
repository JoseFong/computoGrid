import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    id: string
}

export async function GET(req:NextRequest,{params}:{params:Params}){
    try{
        const id = parseInt(params.id)
        const reservaciones = await prisma.reservacion.findMany({
            where: {
                recursoId: id
            }
        })
        if(!reservaciones) return NextResponse.json({message:"Error al encontrar la información."},{status:404})
        return NextResponse.json(reservaciones)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}