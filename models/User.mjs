class User{
    id
    message
    currentChannel
    
    constructor() {
        this.id = `${Math.random().toFixed(5)*(10**5)}`
    }
    setMessage(msg){
        this.message = msg        
    }
    getMessage(){
        return this.message
    }
    getId(){
        return this.id
    }
    setCurrentChannel(channel){
        this.currentChannel = channel
    }

}

export default User