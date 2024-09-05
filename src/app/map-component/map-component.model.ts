export interface Ship {
    name:string
    rotation:number
    position: [number,number]
    faction:string
    battlegroup:string
    class:string
    homeport?:string
    subliner?:boolean
    color?:string
}

export interface Landmark {
    name:string
    class:string
    position:[number,number]
    faction:string
    landmarkType?:string
}