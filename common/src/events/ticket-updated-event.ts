import { Subjects } from "./subject/subjects";

export interface TicketUpdatedEvent{
    subject: Subjects.TicketUpdated;
    data:{
        id: string;
        version: number;
        userId: string;
        title: string;
        price: number;
        orderId?: string;
    }
}