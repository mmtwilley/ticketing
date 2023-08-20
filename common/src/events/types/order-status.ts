export enum OrderStatus{
    // Created - When the order has been created, but the ticket it is trying to order has not been reserved
    Created = 'created',
    //Cancelled -  The ticket the order is trying to reserve has already been reserved, of when the user has cancelled the order
    //The order expires before payment 
    Cancelled = 'cancelled',
    //AwaitingPayment - The order has successfully reserved the ticket 
    AwaitingPayment = 'awaiting:payment',
    //Complete - The order has reserved the ticket and the user has provided payment successfully
    Complete = 'complete'
}