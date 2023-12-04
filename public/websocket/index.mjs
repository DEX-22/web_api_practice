import { btnPrePingPong, pingPong, prePingPong } from "../functions/access.mjs";
const listaSalas = document.getElementById('lista_salas') 

const endpoint = "ws://127.0.0.1:4000";
const channel = "pin_pon"
let ws
const tunnel = new BroadcastChannel(channel) 
window.channels = new Array()


const contenedorMensajes = document.getElementById('bandeja_mensajes')
const inputPing = document.getElementById('inputPing')
const inputPong = document.getElementById('inputPong')

const btnPing = document.getElementById('btnPing') 
const btnPong = document.getElementById('btnPong') 

const txtPing = document.getElementById('txtPing') 
const txtPong = document.getElementById('txtPong') 

btnPrePingPong.onclick = () =>{
  
  
  ws = new WebSocket(endpoint);
  
  prePingPong.style.display = 'none'
  pingPong.style.display = 'block'
  
  // channels.map( ch =>listaSalas.appendChild(addItemList(ch.name)))

  startWebSocket()

}
const addItemList = (text) => {
  const item = document.createElement('li')
  item.innerText= text
  return item
}

const startWebSocket = () =>{
ws.addEventListener("open", function(e) { 

  ws.send('User access')
    ws.addEventListener('message', (event) => { 
      const data = JSON.parse(event.data) 
      if(data.subscribe){
        window.channels = data.channels
        console.log('subscribiendo canales')
        document.innerHTML = "BIEEEN ESTAMOS DENTRO"
      }else{
        const usu = JSON.parse(data)
        console.log(usu);
  
  
  
        const txt = !true ? 
        `<span id="txtPing" style="width: 100%; background-color: cadetblue; ">${data}</span>`: 
        `<span id="txtPong" style="width: 100%; background-color:coral; ">${data}</span>`
        
        contenedorMensajes.innerHTML += txt 

      }



    }) 
}) 
}

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
