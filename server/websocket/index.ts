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
let user


const createChannel = (channel) => {
  channels[channel] = []
}
const addClient = (client,channel) => {
  channels[channel].push({userId:user.getId(),client})
}

const removeFromChannel = (client, channel) => {  
  channels[channel] = channels[channel].filter( c => c == client)
}
 

const changeChannel = (client,dataObj,from) => {
  const {channel,message} = dataObj
  addClient(client, channel) 
  user.setCurrentChannel(channel) 
  removeFromChannel(client, from)  
  const response = JSON.stringify({
    from,to:channel,userId:user.getId(),
    message: 'User enter in '+channel
  })

  broadcast(channel,response,user.getId())
  // client.send(JSON.stringify(response)) 
} 

const reconect = async (client,dataObj) => {
  const {id} = dataObj

  for (const channel in channels) { 
    const index = channels[channel].findIndex(e=> e.userId==id ) 
    if(index !== -1){
      const item = channels[channel].splice(index,1).at(0) 
      channels['WAIT_ROOM'].push(item)
      user.setCurrentChannel('WAIT_ROOM') 
      break
    } 
  }

  // changeChannel(client,dataObj,from)

  let session = await JSON.stringify({channels,id})  
  client.send(session)
 
}
const broadcast = (channel: string, message: string, sender: Number|String) => {
  for (const {userId,client:sock} of channels[channel]) {  
      sock.send(message); 
  }
}
const subscription = (client,dataObj) => {
  user = new User()
  addClient(client, 'WAIT_ROOM');
  
  const subscription = JSON.stringify({id:user.getId(),channels})
 
  client.send(subscription)
  
}
const openChannel = (client,dataObj) => {

  changeChannel(client,dataObj,'WAIT_ROOM')
}
const sendMessage = (client,dataObj) => {

} 

const messageType = (data) : Function => {
  if(data.search('access') !== -1)
    return subscription
  else if(data.search('request') !== -1){
    return openChannel
  }else if(data.search('send message') !== -1){
    return sendMessage
  }else if(data.search('reconect') !== -1){
    return reconect
  }
}

createChannel('WAIT_ROOM')
  createChannel('CHANNEL_1')
  createChannel('CHANNEL_2')
  createChannel('CHANNEL_3')
  createChannel('CHANNEL_4')

wss.on('connection',(client)=>{ 
 
  
  
  client.on('message',(data)=>{ 
    const type = messageType(data) 
    const obj = type.name == 'subscription' ? data : JSON.parse(data)
    type(client,obj) 
    console.log(type.name); 
  })      
})

/**
 * 
    if(typeof data == 'string' && data.search('access') !== -1){
      addClient(client,'WAIT_ROOM') 
      const subsctiption = {subscribe:true,channels} 
      client.send(JSON.stringify(subsctiption))
    }else if(typeof data == 'object'){
      const {channel,message} = data
      console.log('entro, aqui', message.search('request'))
      switch (true) {
        case message.search('request'):
          console.log(client);
          
          sendReplyToRequest(client,channel)
          break; 
        default:
          break;
      }
    }

 */



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
 
