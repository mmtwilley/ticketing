import express, { NextFunction } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import {errrorHandler ,  NotFoundError, currentUser } from "@mttickets2023/common";
import { createChargeRouter } from "./routes/new";


const app = express();
app.set('trust proxy',true);
app.use(express.json());
app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !=='test'
    })
);

app.use(currentUser);

app.use(createChargeRouter);


app.all('*', (req, res, next) =>{
    next (new NotFoundError());
});

app.use(errrorHandler);

export {app};