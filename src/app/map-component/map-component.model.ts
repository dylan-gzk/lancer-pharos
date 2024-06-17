export interface Ship {
    name:string
    rotation:number
    position: [number,number]
    faction:string
    battlegroup:string
    class:string
    homeport?:string
    subliner?:boolean
}

export interface Landmark {
    name:string
    position:[number,number]
    faction:string
}