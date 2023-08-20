import { Subjects } from "./subject/subjects";

export interface OrderCancelledEvent{
    subject: Subjects.OrderCancelled;
    data:{
        id: string;
        version: number;
        ticket:{
            id:string;
        }
    }
}