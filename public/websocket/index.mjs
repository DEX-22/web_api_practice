
const endpoint = "ws://127.0.0.1:4000";
const channel = "pin_pon"
const ws = new WebSocket(endpoint);
const tunnel = new BroadcastChannel(channel) 

const btnPing = document.getElementById('btnPing') 
const btnPong = document.getElementById('btnPong') 

const txtPing = document.getElementById('txtPing') 
const txtPong = document.getElementById('txtPong') 

ws.addEventListener("open", function() {
  console.log("ws connected!");
  ws.send("something"); 

})
ws.onmessage = ({data}) => { 

  const txt = data == 'ping' ? txtPong : txtPing
  txt.innerHTML += data
    // ws.send(`hola soy ${event.data}`)
}

btnPing.addEventListener('click',(event)=>{
  ws.send('ping')
})
btnPong.addEventListener('click',(event)=>{
  ws.send('pong')
})

// tunnel.addEventListener('pin',(msg)=>{
//   console.log(msg);
// })
// tunnel.addEventListener('pon',(msg)=>{
//   console.log(msg);
// })



// btnPong.addEventListener('click',(event)=>{
//     ws.tunnel.send('holaa')
//   // ws.send('y')
// })

// btnPing.addEventListener('click',(event)=>{
//   console.log(ws);
//   tunnel.onmessage = (event) =>{
//     ws.send('x')
//     console.log('event',event);
//     ws.tunnel = tunnel
//   }
// })



// ws.tunnel = tunnel