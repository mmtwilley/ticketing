import { Publisher, OrderCreatedEvent, Subjects } from "@mttickets2023/common";

export class OrderCreatedPublisher extends Publisher <OrderCreatedEvent>{
   readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;

}