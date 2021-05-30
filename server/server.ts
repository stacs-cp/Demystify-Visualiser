import path from "path";
import express,
{ Express, NextFunction, Request, Response } from "express";
const fs = require("fs");

const app: Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("../client/public"));
const examplesFolder = __dirname + "/examples"

app.get("/examples",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /examples (1)");
        try {
            fs.readdir(examplesFolder, (err, files) => {
                if (err) {
                    console.error(err)
                    return
                  }
                inResponse.json(files);
                })
            
        } catch (inError) {
            inResponse.send(inError);
        }
    }
);

app.get("/examples/:name",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /examples (2) " + inRequest.params.name);

        try {
            fs.readFile(examplesFolder + "/" + inRequest.params.name, "utf8", (err, data) => {
                if (err) {
                    console.error(err)
                    return
                  }
                  inResponse.json(JSON.parse(data));
            });
        } catch (inError) {
            inResponse.send(inError);
        }
    }
);

app.listen(5000, () => console.log('Server Started'));