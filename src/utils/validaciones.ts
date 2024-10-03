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