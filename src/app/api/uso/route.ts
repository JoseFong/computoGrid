import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const org_id = body.org_id
        const rec_id = body.rec_id

        const reservaciones = await prisma.reservacion.findMany({
            where: {
                AND: {
                    organizacionId: parseInt(org_id),
                    recursoId: parseInt(rec_id)
                }
            }
        })

        if(!reservaciones || reservaciones.length===0)
            return NextResponse.json({message:"No tiene una reservación para este recurso en este momento."},{status:400})

        const fechaActual = new Date()


        let user:string = ""
        let clave:string = ""
        let encontrado = false;

        for(let i=0;i<reservaciones.length;i++){
            const res = reservaciones[i]
            const dia = res.dia
            const anoactual = fechaActual.getFullYear().toString()
            const mesActual = (fechaActual.getMonth()+1).toString()
            const diaActual = fechaActual.getDate().toString()
            const partes = dia.split("-")
            if(partes[0]===anoactual && partes[1]===mesActual && diaActual===partes[2]){
                console.log("hoy es el día")
                const horaInicioReservacion = parseInt(res.horaInicio.split(":").join(""))
                const horaFinReservacion = parseInt(res.horaFin.split(":").join(""))
                const horaActual = parseInt(fechaActual.getHours().toString()+fechaActual.getMinutes().toString())
                console.log(horaInicioReservacion+"\n"+horaFinReservacion+"\n"+horaActual)
                encontrado = true;
                if(horaInicioReservacion>horaActual){
                    encontrado=false;
                }else if(horaActual>horaInicioReservacion){
                    if(horaActual>=horaFinReservacion){
                        encontrado=false;
                    }
                }
                if(encontrado){
                    const recurso = await prisma.recurso.findFirst({where:{
                        id:parseInt(rec_id)
                    }})
                    user = recurso?.username;
                    clave = recurso?.Password;
                }
            }
        }

        if(!encontrado){
            return NextResponse.json({message:"No tiene una reservación para este recurso en este momento."},{status:400})
        }else{
            let info = {}
            info.username = user;
            info.password = clave;
            console.log()
            return NextResponse.json(info)
        }

        //Agregar lo de cambiar el estado del recurso
        //Agregar lo de agregar log

        return NextResponse.json({message:"ok"},{status:200})
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}