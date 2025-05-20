import { Timestamp } from "firebase/firestore"

export interface Cinguettio {
    id?: string
    text: string
    creationTime: Timestamp
    location?:{
        lat: number
        lng: number
    }
    userId?: string
    nick?: string //informazioni rindondanti (si trova gia in utente), per db non relazionali
}
