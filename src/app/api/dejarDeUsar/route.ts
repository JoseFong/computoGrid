import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const recurso = await req.json()
        const logId = recurso.log

        const fechaTijuana = new Date().toLocaleString('en-US', { timeZone: 'America/Tijuana' });

        console.log(fechaTijuana)

        const partes = fechaTijuana.split(", ")

        await prisma.log.update({
            where: {
                id: parseInt(logId)
            },
            data: {
                fin: partes[1]
            }
        })

        await prisma.recurso.update({
            where: {
                id: parseInt(recurso.id)
            },
            data: {
                orgUsandola: null,
                reservacion: null,
                log: null,
                estado: "Disponible"
            }
        })

        return NextResponse.json({message:"OK"},{status:200})

    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}