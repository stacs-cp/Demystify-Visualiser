"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "build")));
app.use(express_1.default.static("../client/public"));
app.listen(5000, function () { return console.log('Server Started'); });
