import { Publisher, ExpirationCompleteEvent, Subjects } from "@mttickets2023/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;



}