import { Publisher, Subjects, TicketUpdatedEvent } from "@mttickets2023/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}
