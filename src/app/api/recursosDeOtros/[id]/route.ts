import {prisma} from "@/libs/prisma"
import { Recurso } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

interface Params{
    id: string
}

export async function GET(req:NextRequest,{params}:{params:Params}){
    try{
        const id:number = parseInt(params.id)
        const recursos = await prisma.recurso.findMany({
            where: {
                organizacionId: {
                    not: id
                }
            }
        })
        if(!recursos) return NextResponse.json({message:"Error al conseguir los recursos."},{status:404})
        return NextResponse.json(recursos)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}