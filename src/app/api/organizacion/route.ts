import { createOrganizacion } from "@/Controller/organizacionController";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/libs/prisma"

export async function POST(req:NextRequest){
    try{
        const data = await req.json()
        const response = await createOrganizacion(data)
        if(!response) return NextResponse.json({message:"Error al realizar la acción."},{status:404})
        if(response!=="registrada") return NextResponse.json({message:response},{status:400})
        return NextResponse.json({message:"Organización registrada exitosamente."},{status:200})
    }catch(e:any){
        return NextResponse.json({message:"Error al realizar la acción."},{status:500})
    }
}

export async function GET(req:NextRequest) {
    try{
        const response = await prisma.organizacion.findMany()
        if(!response) return NextResponse.json({message:"Error al realizar la acción."},{status:404})
        return NextResponse.json(response)
    }catch(e:any){
        return NextResponse.json({message:"Error al realizar la acción."},{status:500})
    }
}