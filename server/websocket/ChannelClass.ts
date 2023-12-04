import {BroadcastChannel} from 'node:worker_threads';
class ChannelX {
    id
    instance
    clients
    constructor(name){
        this.instance = new BroadcastChannel(name)
    }

}