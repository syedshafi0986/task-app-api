import app from "../server.js";
import {createServer} from "http"


const server = createServer(app)

export default (req,res)=>{
    server.emit("request",req,res)
}