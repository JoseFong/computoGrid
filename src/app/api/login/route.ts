import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req:NextRequest){
    try{
        const data = await req.json()
        const organizacion = await prisma.organizacion.findFirst({
            where:{
                username: data.username
            }
        })
        if(!organizacion) return NextResponse.json({message:"Usuario o contraseña incorrectos."},{status:400})
            const match = await bcrypt.compare(data.password,organizacion.password)
        if(!match)
            return NextResponse.json({message:"Usuario o contraseña incorrectos."},{status:400})
        return NextResponse.json({message:organizacion.id},{status:200})
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}