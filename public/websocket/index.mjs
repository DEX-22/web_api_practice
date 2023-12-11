import { btnPrePingPong, pingPong, prePingPong } from "../functions/access.mjs";
import {contenedorMensajes,inputPing,inputPong,returnToChannels,
        btnPing,btnPong,txtPing,txtPong,listaSalas, contenedorSalas, salaName, sendMessage, inputMessage, cajaMensajes} from '../components/websockets.mjs'


const endpoint = "ws://127.0.0.1:4000";
let channel = ""
let ws
const tunnel = new BroadcastChannel(channel)
window.channels = new Array()

const updateChannelList = (userId,from,to) => {
  const index = window.channels[from].findIndex(ch=>ch.userId == userId)
  const user = window.channels[from].splice(index,1).at(0)
  window.channels[to].push(user) 
}

const sendRequestToEnterInSala = async (channel) => {
  const req = {userId,channel,message:'request to enter in room'}
  console.log('solicitud para ingresar a sala'); 
  await ws.send(JSON.stringify(req)) 
  ws.onmessage =async (event)=>{
    const {userId,from,to} = await JSON.parse(event.data)
    channel = to
    sendMessage.onclick = (e) => userSendMessage(to)
    returnToChannels.onclick = (e) => returnToChannelsSection(to) 
    updateChannelList(userId,from,to) 
    contenedorSalas.style = 'display: none;'
    contenedorMensajes.style = 'display: flex; flex-direction: column;'
    salaName.innerText = to

  }
}

const addItemList = (text) => {
  const item = document.createElement('div')
  item.className += 'w-1/2   p-1 border-blue btn btn-success '
  const button = document.createElement('button')
  button.innerText = text
  button.onclick = () => sendRequestToEnterInSala(text)
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
    }
  } 
const reconect = (e) =>{
    e.target.send(JSON.stringify({message:'reconect user ',id:userId()}))
    e.target.onmessage = (e) => {
      const {channels} = JSON.parse(e.data)
      console.log(channels);
      window.channels = channels
      createList(window.channels) 
    }
}

const startWebSocket = async () => {
  await ws.addEventListener("open", async(e)=>{
    if(!hasSession()){
      await startSesion(e) 
    }else{ 
      reconect(e)
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

const returnToChannelsSection = (from) => {
  updateChannelList(userId(),from,'WAIT_ROOM') 
  contenedorMensajes.style.display = 'none'
  contenedorSalas.style.display = 'block'
}
const getChatBubbleElement = (type,message) => {
  const container = document.createElement('div')
  const messageBubble = document.createElement('div')
  let side
  let bubbleType
  if(type == 'self'){
    side = 'chat-end'
    bubbleType = 'chat-bubble-secondary' 
  }else{
    side = 'chat-start'
    bubbleType = 'chat-bubble-accent' 
  } 

  container.className = `chat ${side}`
  messageBubble.className = `chat-bubble ${bubbleType}`
  messageBubble.innerText = message
  container.appendChild(messageBubble)
  // cajaMensajes.appendChild(container)
  return container
}
const renderMessage = (message,from) => {
  const typeBubble = from == userId() ? 'self' : 'noself'
  const messageElement =  getChatBubbleElement(typeBubble,message)
  cajaMensajes.appendChild(messageElement)
}
const userSendMessage = (to) => {
  const message = inputMessage.value
  const request = JSON.stringify({
    data:{ from:userId(), to, message },
    message:'user send message'
  })
  ws.send(request)
  ws.onmessage = (event) =>{
    const {from,to,message} = JSON.parse(event.data)
    renderMessage(message,from)
  }
}

// ws.addEventListener('close', (e) =>{
//     localStorage.removeItem('user_id')
// })
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
