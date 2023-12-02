/** USO DE INDEX DB*/

const notas = { dias: [{ message: 'si' }] }
export const pre = document.getElementsByTagName('pre')[0]
/**
 * IBDFactory
 * Proporciona acceso a una base de datos. 
 * Esta es la interfaz implementada por el objeto global indexedDB y es, 
 * por tanto, el punto de entrada a la API.
 */

const IBDFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB
// const IBDTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction     

/**
 * IDBRequest
 * 
 * Interfaz genérica que gestiona las peticiones a 
 * la base de datos y proporciona acceso a los resultados.
 */
/**
 * IDBOpenDBRequest
 * Representa una solicitud para abrir una base de datos.
 */

const IDBOpenDBRequest = IBDFactory.open('MiDb',3)  //request 
IDBOpenDBRequest.onerror = () => {
    console.log('error');
}


IDBOpenDBRequest.onupgradeneeded = (e) => {
    
    const db = e.target.result
    const cObjectStore = db.createObjectStore('mis_notas',{autoIncrement:true})  
    // cObjectStore.add(notas)

}



/**
 * IBDTransaction
 * 
 * Representa una transacción. 
 * Se crea una transacción en una base de datos, 
 * se especifica el ámbito (por ejemplo, a qué almacenes de objetos se desea acceder) 
 * y se determina el tipo de acceso (sólo lectura o lectura-escritura) que se desea.
*/


/**
 * IDBObjectStore
 * 
 * La interfaz IDBObjectStore de la API IndexedDB representa un almacén de objetos en una base de datos. 
 * Los registros de un almacén de objetos se ordenan según sus claves. 
 * Esta ordenación permite una rápida inserción, búsqueda y recuperación ordenada.
 */

IDBOpenDBRequest.onsuccess = (event) => {
    const db = event.target.result;
    pre.innerHTML += "<li> Base de datos lista </li>";
    
    const form = document.getElementById('form')
    form.addEventListener('submit',(e) => {
        e.preventDefault();  

        addInDb() 
          
    })

    const btnShow = document.getElementById('btn')
    btnShow.addEventListener('click',()=>{
        mostrarDatosEnDOM()
    })


    // const mis_notas = db.transaction(['mis_notas'],'readwrite')
    // const obj_mis_notas = mis_notas.objectStore('mis_notas')
    // const mis_notas_request = obj_mis_notas.add(notas)
// funcion para almacenar en la base de datos
const addInDb = () =>{
        const IBDTransaction = db.transaction(['mis_notas'], 'readwrite');
        const IDBObjectStore = IBDTransaction.objectStore('mis_notas');
        const request = IDBObjectStore.add(notas);
        request.onsuccess = () => console.log('Datos almacenados con exito en la base de datos'); 
        IBDTransaction.oncomplete = () =>  mostrarDatosEnDOM()
}
 // funcion para mostrar datos en el DOM
 const mostrarDatosEnDOM = () => {
    const listaDatos = document.getElementsByTagName('pre')[0];

    // Limpiar la lista antes de volver a mostrar los datos
    listaDatos.innerHTML = '';

    // Abrir una transacción de solo lectura para leer los datos del almacén de objetos
    const readTransaction = db.transaction(['mis_notas'], 'readonly');
    const readObjectStore = readTransaction.objectStore('mis_notas');
    const readRequest = readObjectStore.openCursor();

    readRequest.onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        // Crear un elemento de lista para cada entrada de datos
        const listItem = document.createElement('li');
        listItem.textContent = JSON.stringify(cursor.value)
        listaDatos.appendChild(listItem);

        // Mover el cursor al siguiente elemento
        cursor.continue();
      }
    };

    readTransaction.onerror = (event) => {
      console.error('Error al leer datos:', event.target.error);
    };
  };
 
    
} 
     


/**
 * Recuperación y modificación de datos
 */




// const IDBTransaction = db.transaction(['mis_notas'],'readwrite')


// IDBTransaction.oncomplete = () =>{
//     console.log('asdasdsadasd')
//     pre.innerHTML += "asdasd"
// }
 

// const IDBObjectStore = IDBTransaction.objectStore('mis_notas')


/**
 * IDBObjectStore: add() method
 * 
 * El método add() de la interfaz IDBObjectStore devuelve un objeto IDBRequest y, en un hilo separado, 
 * crea un clon estructurado del valor y almacena el valor clonado en el almacén de objetos. 
 * Se utiliza para añadir nuevos registros a un almacén de objetos.
 */

// IDBObjectStore.add(notas)



/**
 * 
 * El método put() de la interfaz IDBObjectStore actualiza un registro dado en una base de datos, 
 * o inserta un nuevo registro si el elemento dado aún no existe.
 * 
 * Devuelve un objeto IDBRequest y, en un hilo separado, crea un clon estructurado del valor y 
 * almacena el valor clonado en el almacén de objetos. Esto es para añadir nuevos registros, 
 * o actualizar registros existentes en un almacén de objetos cuando el modo de la transacción es lectura-escritura. 
 * Si el registro se almacena correctamente, se dispara un evento de éxito en el objeto de petición 
 * devuelto con el resultado establecido a la clave del registro almacenado, 
 * y la transacción establecida a la transacción en la que se abre este almacén de objetos.
 * 
 */


//                      IDBObjectStore.put(value, index)

/**
 * IDBIndex
 *  * 
 * La interfaz IDBIndex de la API IndexedDB proporciona acceso asíncrono a un índice de una base de datos. 
 * Un índice es un tipo de almacén de objetos para buscar registros en otro almacén de objetos, 
 * denominado almacén de objetos referenciado. Esta interfaz se utiliza para recuperar datos.
 * Los registros de un almacén de objetos se pueden recuperar a través de la clave primaria o mediante un índice. 
 * Un índice permite buscar registros en un almacén de objetos utilizando propiedades de los valores
 *  de los registros del almacén de objetos distintas de la clave primaria
 */




/**
 * IDBIndex.get()
 * 
 * Devuelve un objeto IDBRequest y, en un subproceso separado, encuentra el valor en el almacén de objetos 
 * referenciado que corresponde a la clave dada o el primer valor correspondiente, si la clave es un IDBKeyRange.
 * 
*/

// const X = IBDTransaction.objectStore('mis_notas')
// X.get(0)

// X.onsuccess = (e) =>{
//     console.log('BIEN')
//     pre.innerHTML = `<p> TENEMOS LA BIEN</p>`
// }





 