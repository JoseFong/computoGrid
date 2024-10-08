export function textoVacio(texto:String){
    if(texto==="") return true
    return false
}

export function validarHoras(horaInicio:string, horaFin:string){
    const p1:string[] = horaInicio.split(":")
    const p2:string[] = horaFin.split(":")
    const m1:number = (parseInt(p1[0])*60) + parseInt(p1[1])
    const m2:number = (parseInt(p2[0])*60) + parseInt(p2[1])
    if(m1>m2 || m1===m2) return true
    return false
}

export function validarFecha(f:string){
    const fp = f.split("-")
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()+1
    const d = date.getDate()

    if(parseInt(fp[0])<y){
        return true
    }else if(parseInt(fp[0])>y){
        return false
    }else{
        if(parseInt(fp[1])<m){
            return true
        }else if(parseInt(fp[1])>m){
            return false
        }else{
            if(parseInt(fp[2])<d){
                return true
            }else{
                return false
            }
        }
    }
}

export function convertirAMinutos(hora:string){
    const [horas,minutos] = hora.split(":").map(Number)
    return horas*60 + minutos
}