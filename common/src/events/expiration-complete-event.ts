import { Subjects } from "./subject/subjects";

export interface ExpirationCompleteEvent{
    subject: Subjects.ExpirationComplete;
    data: {
        orderId: string;
    }
}