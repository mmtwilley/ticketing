import {app} from './app';
import mongoose from "mongoose";
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledEventLister } from './events/listeners/order-cancelled-listener';

const start = async() => {
    console.log("Starting up tickets service ....");

    if (!process.env.JWT_KEY){
        throw new Error("Environment Variable JWT_KEY not defined");
     }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined!')
    }
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined!')
    }
    if(!process.env.NATS_URL){
        throw new Error('NATS_URL must be defined!')
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID must be defined!')
    }

    
    try{
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!");
            process.exit();
        });
    } catch{
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    }

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCreatedListener(natsWrapper.client).listen();
    
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log('Connected to MongoDb')
    } catch(err){
        console.error(err);
    }
    app.listen(3000,()=>{
        console.log('Listening on port 3000!');
    });
};


start();