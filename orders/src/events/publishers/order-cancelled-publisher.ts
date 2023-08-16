import { Subjects, Publisher, OrderCancelledEvent } from "@mttickets2023/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}