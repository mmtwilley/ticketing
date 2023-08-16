import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import {app} from '../app';
import jwt from 'jsonwebtoken';

declare global {
    var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');
process.env.STRIPE_KEY = "sk_test_51Nd3ZNDW6tEQRg7Npi5YnrDY6cyYl3sFYdMK4kDj2mNmXii7i7J2fKqxOUxANgjUpUUqK5YwRPP1KPK8Gjs8LM1w00RQPR5HdJ";



let mongo: any; 
beforeAll(async () => {
    process.env.JWT_KEY = "asdf";
  
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin =  () => {
    // Build a JWT payload {id,email}

    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email:'testing@test.com'
    };

    // Create the JWT!
    const token = jwt.sign(payload,process.env.JWT_KEY!);

    // Build session Object, {jwt:MY_JWT}
    const session = {jwt:token};
    //Take JSON and encode into Base64
    const base64 = Buffer.from(JSON.stringify(session)).toString('base64')
    //return a string thats the cookie with the data
    return [`session=${base64}`];
}