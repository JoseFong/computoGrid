import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";
import { Reservacion } from "@prisma/client";
import { convertirAMinutos } from "@/utils/validaciones";

export async function POST(req:NextRequest){
    try{
        const data = await req.json()
        const fechaString = data.dia
        let date = new Date(fechaString)
        date.setDate(date.getDate()+1)
        const dia = date.toString().split(" ")
        const d = dia[0].toLowerCase()
        
        const recurso = await prisma.recurso.findFirst({
            where: {
                id: data.recursoId
            }
        })

        if(!recurso) return NextResponse.json({message:"No se encontró el recurso."},{status:404})

        const horarioString = recurso.horario
        const horario = JSON.parse(horarioString)

        let day = ""

        if(d==="mon") day="lunes"
        if(d==="tue") day="martes"
        if(d==="wed") day="miercoles"
        if(d==="thu") day="jueves"
        if(d==="fri") day="viernes"
        if(d==="sat") day="sabado"
        if(d==="sun") day="domingo" 
        

        if(horario[day]){
            let inicioExistente = convertirAMinutos(horario[day].inicio);
            let finExistente = convertirAMinutos(horario[day].fin);

            let inicioNuevo = convertirAMinutos(data.inicio);
            let finNuevo = convertirAMinutos(data.fin);
        
            if(inicioNuevo>=inicioExistente){
                if(finNuevo>finExistente){
                    return NextResponse.json({message:"El recurso no está disponible en este horario."},{status:400})
                }
            }else{
                return NextResponse.json({message:"El recurso no está disponible en este horario."},{status:400})
            }
        }else{
            return NextResponse.json({message:"El recurso no está disponible en este horario."},{status:400})
        }

        let error = false

        const reservaciones = await prisma.reservacion.findMany()
        reservaciones.map((reservacion:Reservacion)=>{
            if(reservacion.dia===data.dia){
                let inicioExistente = convertirAMinutos(reservacion.horaInicio);
                let finExistente = convertirAMinutos(reservacion.horaFin);
                let inicioNuevo = convertirAMinutos(data.inicio);
                let finNuevo = convertirAMinutos(data.fin);
    

                if(inicioNuevo===inicioExistente && finExistente===finNuevo){
                    error = true
                }

                if(inicioNuevo<inicioExistente){
                    if(finNuevo>=inicioExistente){
                        error = true
                    }
                }else{
                    if(inicioNuevo<=finExistente){
                        error = true
                    }
                }
            }
        })

        if(error){
            return NextResponse.json({message:"El recurso ya está reservado en este horario."},{status:400})

        }

        const reservacion = await prisma.reservacion.create({
            data: {
                recursoId: data.recursoId,
                organizacionId: parseInt(data.orgId),
                horaInicio: data.inicio,
                horaFin: data.fin,
                dia: data.dia
            }
        })

        return NextResponse.json(reservacion)
    }catch(e:any){
        console.log(e)
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}