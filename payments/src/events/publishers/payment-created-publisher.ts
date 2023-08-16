import { Subjects, Publisher, PaymentCreatedEvent } from "@mttickets2023/common";

export class PaymentCreatedPublisher extends Publisher <PaymentCreatedEvent>{
    readonly subject:Subjects.PaymentCreated = Subjects.PaymentCreated;
}