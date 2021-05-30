import path from "path";
import express,
{ Express, NextFunction, Request, Response } from "express";

const app : Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("../client/public"));



app.listen(5000, () => console.log('Server Started'));