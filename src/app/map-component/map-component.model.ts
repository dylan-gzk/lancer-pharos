export interface Ship {
    name:string
    rotation:number
    position: [number,number]
    faction:string
    battlegroup:string
    class:string
    homeport?:string
    subliner?:boolean
    description?:string
    cargo?:string
    pilots?:Pilot[]
    color:string
}

export interface Landmark {
    name:string
    class:string
    position:[number,number]
    faction:string
    landmarkType?:string
    description?:string
}

export interface Pilot{
    name:string
    callsign:string
    callsignColor?:string
    frame:string
    frameName:string
    
}