import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import BroadcastChannel from 'node:worker_threads';
class WebSocketX{
    id
    intance
    channels
    clients
    constructor(url,name) {
        this.id = name
        if(this.intance)
            return this.intance

        this.intance = WebSocketServer(url)
        
        return this.intance
    } 
    addChannel(name){
        const channel = new BroadcastChannel(name)
        this.channels.push(channel)
    }
    addClientInChannel(client,channel){
        this.channels[channel].push(client)
    }
    sendMessage(channel,msg,sender){
        for (const sock of this.channels[channel]) {
            if (sock !== sender && sock.readyState === WebSocket.OPEN) {
              sock.send(msg);
            }
          }
    }

}

export default WebSocketX