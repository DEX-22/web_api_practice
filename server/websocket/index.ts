import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import {BroadcastChannel} from 'node:worker_threads';
// import BroadcastChannel from 'https://deno.land/x/websocket@v0.1.4/mod.ts'

const respuestas = {
  'hola': "hola bienvenido al nuevo chat, empecemos a conversar"
}


const wss = new WebSocketServer(4000);
const channel = new BroadcastChannel('pin_pon')
const clients = new Set()

wss.on("connection", function (ws) {
  clients.add(ws)
  console.log('aqui vamos con: '+clients.size) 
  ws.on("message", function (message) {
    clients.forEach((c)=>{
      console.log('recibido',message)
      c.send(message)
     }); 
    })
  ws.send('conectao')
});