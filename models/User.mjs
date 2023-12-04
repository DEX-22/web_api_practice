class User{
    id
    message
    constructor() {
        this.id = `${Math.random().toFixed(2)*100}`
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

}

export default User