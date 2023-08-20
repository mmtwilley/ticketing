import { Subjects } from "./subject/subjects";

export interface TicketCreatedEvent{
    subject: Subjects.TicketCreated;
    data:{
        id: string;
        version: number;
        title: string;
        price: number;
        userId:string;
    }
}