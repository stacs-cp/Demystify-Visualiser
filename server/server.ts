import path from "path";
import express,
{ Express, NextFunction, Request, Response } from "express";
const fs = require("fs");
const {spawn} = require('child_process');
const config = require("./config.js")

const app: Express = express();

app.use(express.json());

app.use(config.baseUrl, express.static(path.join(__dirname, "..", "client", "build")));
app.use(config.baseUrl, express.static(path.join(__dirname, "..", "client", "public")));

const uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};

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
        console.log("POST /run (1)");
        const {eprime, eprimename, param, paramname} = inRequest.body;

        fs.writeFile("./uploads/" + eprimename, eprime, (err) => {
            if (err) return inResponse.sendStatus(500);
            fs.writeFile("./uploads/" + paramname, param, (err) => {
                if (err) return inResponse.sendStatus(500);
                
                const process = spawn("python3", [
                    path.join(config.demystifyPath, "demystify"),
                    "--eprime",
                        "./uploads/" + eprimename,
                    "--eprimeparam",
                        "./uploads/" + paramname,
                    "--json",
                        "demystifyoutput"
                  ]);
                
                process.stdout.on('data', (data) => {
                    console.log(uint8arrayToString(data))
                });

                process.stderr.on('data', (data) => {
                    console.log(uint8arrayToString(data))
                });

                process.on('close', (code) => {
                    const data = fs.readFileSync("./demystifyoutput.json", "utf8");
                    inResponse.json(JSON.parse(data));
                });
            });
        });
    }
)

app.use(config.baseUrl, indexRouter);
app.listen(config.port, () => console.log('Server Started'));