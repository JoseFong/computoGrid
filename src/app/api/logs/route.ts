import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){
    try{
        const logs = await prisma.log.findMany()
        return NextResponse.json(logs)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}