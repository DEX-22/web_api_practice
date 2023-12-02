import { pre } from "./db/index.mjs";

export const ConnectionElement = document.getElementById('connection_section')
const btnConnection = document.getElementById('btn-connection')

const mostrarEstadoConexion = () => {
    if (navigator.onLine) {
        ConnectionElement.innerHTML += 'Conectado a internet \n';
        ConnectionElement.innerHTML += `<br> Tipo de conexión: ${navigator.connection?.effectiveType}`;
        ConnectionElement.innerHTML += `<br> Velocidad de descarga: ${navigator.connection?.downlink} Mbps`;
        ConnectionElement.innerHTML += `<br> Velocidad de carga: ${navigator.connection?.uplink} Mbps`;
        for (const item in Object.getOwnPropertyNames(navigator.connection)) {
            console.log(item);
        }
        ConnectionElement.innerHTML +=`<br>`
      

    } else {
        ConnectionElement.innerHTML += 'Sin conexión a internet \n';
    }
  };
  btnConnection.addEventListener('click',()=>{
    mostrarEstadoConexion()
  })
  // Escuchar eventos de conexión y desconexión
  window.addEventListener('online', () => {
    mostrarEstadoConexion();
  });

  window.addEventListener('offline', () => {
    mostrarEstadoConexion();
  }); 






