import { btnPrePingPong, pingPong, prePingPong } from "../functions/access.mjs";
import {contenedorMensajes,inputPing,inputPong,
        btnPing,btnPong,txtPing,txtPong,listaSalas} from '../components/websockets.mjs'


const endpoint = "ws://127.0.0.1:4000";
const channel = "pin_pon"
let ws
const tunnel = new BroadcastChannel(channel)
window.channels = new Array()

const updateChannelList = (userId,from,to) => {
  const index = window.channels[from].findIndex(ch=>ch.userId == userId)
  const user = window.channels[from].splice(index,1).at(0)
  window.channels[to].push(user)
  console.log(window.channels[to]);
}

const sendRequetToEnterInSala = async (channel) => {
  const req = {channel,message:'request to enter in room'}
  console.log('solicitud para ingresar a sala'); 
  await ws.send(JSON.stringify(req)) 
  ws.onmessage =async (event)=>{
    const {userId,from,to} = await JSON.parse(event.data)
    updateChannelList(userId,from,to) 
  }
}

const addItemList = (text) => {
  const item = document.createElement('li')
  const button = document.createElement('button')
  button.innerText = text
  button.onclick = () => sendRequetToEnterInSala(text)
  item.appendChild(button)
  listaSalas.appendChild(item);
}

const createList = (channels) => {
  for (const key in channels) {
    addItemList(key);
  }
};

const startSesion = async (e) => {
    // ws = e.target
    await ws.send('User access')
      ws.onmessage = async (event) => {
      const {id,channels} = await JSON.parse(event.data) 
        window.channels = channels
        localStorage.setItem('user_id',id)
        createList(window.channels)
        console.log('asd',window.channels);
        contenedorMensajes.innerHTML = "BIEEEN ESTAMOS DENTRO" 
    }
  } 

const startWebSocket = async () => {
  await ws.addEventListener("open", async(e)=>{
    if(!hasSession()){
      await startSesion(e) 
    }else{ 
      
    }
    

  })
}

btnPrePingPong.onclick = async () => {

  ws = new WebSocket(endpoint);

  prePingPong.style.display = 'none'
  pingPong.style.display = 'block'

  await startWebSocket();
}


const userId = () => localStorage.getItem('user_id') 

const hasSession = () =>!!userId() ?? false


// btnPing.onclick = (event)=>{
//   const message = inputPing.value
//   const txt = JSON.stringify({sender:'ping',message})
//   ws.send(txt)
// }
// btnPong.onclick = (event)=>{
//   const message = inputPong.value
//   const txt = JSON.stringify({sender:'pong',message})
//   ws.send(txt)
// }
