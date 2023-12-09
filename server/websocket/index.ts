import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import {BroadcastChannel} from 'node:worker_threads';  
import User from "../../models/User.mjs";
// import BroadcastChannel from 'https://deno.land/x/websocket@v0.1.4/mod.ts'

const respuestas = {
  'hola': "hola bienvenido al nuevo chat, empecemos a conversar"
}

// const router = new Router()
const wss = new WebSocketServer(4000);
const defaultChannel = new BroadcastChannel('default')
const pin_pon = new BroadcastChannel('pin_pon')
const clients = new Set()
const channels = {}


const createChannel = (channel) => {
  channels[channel] = []
}
const addClient = (client,channel) => {
  channels[channel].push(client)
}

const removeFromChannel = (client, channel) => {
  channels[channel] = channels[channel].filter( c => c !== client);
}

createChannel('WAIT_ROOM')
createChannel('CHANNEL_1')
createChannel('CHANNEL_2')
createChannel('CHANNEL_3')
createChannel('CHANNEL_4')


wss.on('connection',(client)=>{ 
 
  const user = new User()
  client.on('message',(data)=>{
    if(typeof data == 'string' && data.search('access')){
      addClient(client,'WAIT_ROOM')
      console.log(channels);
      const subsctiption = {subscribe:true,channels} 
      client.send(JSON.stringify(subsctiption))
    }else if(typeof data == 'object'){
      const {channel,message} = data
      console.log(data);
      removeFromChannel(client, 'WAIT_ROOM');
      addClient(client, channel);
      user.setMessage(message) 
      for (const c of channels[channel]) { 
          c.send(JSON.stringify(user))
      } 
    }




    
  })      
})

// pin_pon.dispatchEvent('message')
// channel.onmessage = () =>{
// }



// const clients = new Set()
// const channels: Record<string,WebSocket[] > = {}
// // channel
// wss.on("connection", function (ws) {
//   ws.on("subscribe",(channel)=>{
//       channels[channel].push(w)
//   })
//   clients.add(ws)
//   console.dir(ws.channels)
//   console.log('aqui vamos con: '+clients.size) 
//   ws.on("message", function (message) {
//     clients.forEach((c)=>{
//       console.log('recibido',message)
//       c.send(message)
//      }); 
//     })
//   ws.send('conectao')
// });
 
const broadcast = (channel: string, message: string, sender: WebSocket) => {
  for (const sock of channels[channel]) {
    if (sock !== sender && sock.readyState === WebSocket.OPEN) {
      sock.send(message);
    }
  }
}