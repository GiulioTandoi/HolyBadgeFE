import { Parishioner } from "./parishioner";

export interface Partecipant{
    id: number
    partecipation: Date
    parishioner: Parishioner
    memberships: string []
  
  }
  