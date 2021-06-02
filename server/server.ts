import path from "path";
import express,
{ Express, NextFunction, Request, Response } from "express";
const fs = require("fs");

const app: Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("../client/public"));
const examplesFolder = "./examples"

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
            inResponse.status(400).send(inError.message);
        }
    }
);

app.get("/examples/:name",
    async (inRequest: Request, inResponse: Response) => {
        const name = inRequest.params.name.replace(/\W/g, '');
        console.log("GET /examples (2) " + name);
        try {
            const data = fs.readFileSync(examplesFolder + "/" + name + ".json", "utf8");
            inResponse.json(JSON.parse(data))
        } catch (inError) {
            inResponse.status(400).send(inError.message)
        }
        
        
    }
);

app.listen(5000, () => console.log('Server Started'));