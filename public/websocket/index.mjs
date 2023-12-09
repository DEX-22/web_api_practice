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

btnPrePingPong.onclick = async () => {

  ws = new WebSocket(endpoint);

  prePingPong.style.display = 'none'
  pingPong.style.display = 'block'

  await startWebSocket();
}

const addItemList = (text) => {
  const item = document.createElement('li')
  const button = document.createElement('button')
  button.innerText = text
  button.onclick = () => sendRequetToEnterInSala(text)
  item.appendChild(button)
  listaSalas.appendChild(item);
}

const createItemList = (channels) => {
  for (const key in channels) {
    addItemList(key);
  }
};
const sendRequetToEnterInSala = (channel) => {
  const req = {channel,message:'request to enter in room'}
  console.log('solicitud para ingresar a sala envida');
    ws.send(JSON.stringify(req))
}

const startWebSocket = async () => {
  await ws.addEventListener("open", async function (e) {

    await ws.send('User access')
    await ws.addEventListener('message', async (event) => {
      const data = await JSON.parse(event.data)
      if (data.subscribe) {
        window.channels = data.channels
        createItemList(window.channels);
        document.innerHTML = "BIEEEN ESTAMOS DENTRO"
      } else {
        const usu = JSON.parse(data)
        console.log(usu);

        const txt = !true ?
          `<span id="txtPing" style="width: 100%; background-color: cadetblue; ">${data}</span>` :
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
