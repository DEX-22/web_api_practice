import { addWsUser, existsUser } from "../localStorage/index.mjs"

export const prePingPong = document.getElementById('pre_ping_pong')
export const btnPrePingPong = document.getElementById('btn_pre_ping_pong')
export const pingPong = document.getElementById('ping-pong')

document.onload = (e) =>{
    
    if(!existsUser)
        pingPong.style.display = 'none'
}

