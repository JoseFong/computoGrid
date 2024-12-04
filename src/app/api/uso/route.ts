import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const org_id = body.org_id
        const rec_id = body.rec_id

        console.log(JSON.stringify(body))

        const reservaciones = await prisma.reservacion.findMany({
            where: {
                AND: {
                    organizacionId: parseInt(org_id),
                    recursoId: parseInt(rec_id)
                }
            }
        })

        console.log(JSON.stringify(reservaciones))

        if(!reservaciones || reservaciones.length===0)
            return NextResponse.json({message:"No tiene una reservación para este recurso en este momento."},{status:400})

        let user:string = ""
        let clave:string = ""
        let encontrado = false;

        const fechaActual = new Date()
        console.log(fechaActual)

        const fechaTijuana = new Date().toLocaleString('en-US', { timeZone: 'America/Tijuana' });

        console.log("Fecha y hora actual en Tijuana:", fechaTijuana);

        const partes = fechaTijuana.split(", ")
        console.log(partes)

        const [mesA,diaA,anoA] = partes[0].split("/").map((p:any)=>parseInt(p))
        console.log(anoA+" "+mesA+" "+diaA)    

        const [horaCompleta,extra] = partes[1].split(" ")        
        let [hora,minuto,segundo] = horaCompleta.split(":")

        let horaA = 0

        if(extra==="PM"){
            horaA = parseInt(((parseInt(hora)+12).toString())+minuto)
        }else{
            horaA = parseInt(hora+minuto)
        }

        console.log(horaA)

        for(let i=0;i<reservaciones.length;i++){
            const fecha = reservaciones[i].dia
            const [anoR,mesR,diaR] = fecha.split("-").map((p:any)=>parseInt(p))
            console.log("*** "+anoR+" "+mesR+" "+diaR)
            if(anoR==anoA && mesR==mesA && diaR==diaA){
                console.log("coincidencia de dias")
                const hi = parseInt(reservaciones[i].horaInicio.split(":").join(""))
                const hf = parseInt(reservaciones[i].horaFin.split(":").join(""))
                console.log(hi+" "+hf)
                if(horaA >= hi && horaA<=hf){
                    console.log("estas dentro de la hora")
                    encontrado = true
                    const rec = await prisma.recurso.findFirst({
                        where: {
                            id: reservaciones[i].recursoId
                        }
                    })
                    const info = {
                    username: rec?.username,
                    password: rec?.Password
                    }

                    actualizarEstados(reservaciones[i])
                    creandoLog(reservaciones[i],horaCompleta)
                    

                return NextResponse.json(info)
                }
            }
        }
                return NextResponse.json({message:"No tiene una reservación para este recurso en este momento."},{status:400})
            
        

    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}

export async function actualizarEstados(reservacion:any){
    console.log("actualizando estados...")
    const id_rec = reservacion.recursoId
    console.log(id_rec)
    await prisma.recurso.update({
        where: {
            id: parseInt(id_rec)
        },
        data: {
            estado: "En uso"
        }
    })
}

export async function creandoLog(reservacion:any,horaCompleta:any){
    console.log("creando log....")
    const recId = reservacion.recursoId
    const orgId = reservacion.organizacionId
    const fecha = reservacion.dia


    const log = await prisma.log.create({
        data: {
            recursoId: parseInt(recId),
            organizacionId: parseInt(orgId),
            fecha: fecha,
            inicio: horaCompleta,
            fin: "ACT",
            reservacionId: reservacion.id
        }
    })

    await prisma.recurso.update({
        where: {
            id: parseInt(recId)
        },
        data: {
            orgUsandola: orgId,
            reservacion: reservacion.id,
            log: log.id
        }
    })
}