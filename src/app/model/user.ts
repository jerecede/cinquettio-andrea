import { Timestamp } from "firebase/firestore"

export interface User {
    id: string
    nick: string
    email: string
    creationTime: Date
    lastLogin: Date
}
