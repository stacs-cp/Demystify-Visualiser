import path from "path";
import express,
{ Express, NextFunction, Request, Response } from "express";
const fs = require("fs");
const config = require("./config.js")

const app: Express = express();

app.use(express.json());

app.use(config.baseUrl, express.static(path.join(__dirname, "..", "client", "build")));
app.use(config.baseUrl, express.static(path.join(__dirname, "..", "client", "public")));


var indexRouter = express.Router();

const examplesFolder = "./examples"
indexRouter.get("/examples",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /examples (1)");
        try {
            fs.readdir(examplesFolder, (err, files) => {
                if (err) {
                    console.error(err)
                    return
                  }
                inResponse.json(files.map((f: String) => f.slice(0, -5)));
                })
            
        } catch (inError) {
            inResponse.status(400).send(inError.message);
        }
    }
);

indexRouter.get("/examples/:name",
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

indexRouter.post("/run", 
    async (inRequest: Request, inResponse: Response) => {
        console.log('Got body:', inRequest.body);
        inResponse.sendStatus(200);
    }
)

app.use(config.baseUrl, indexRouter);
app.listen(config.port, () => console.log('Server Started'));