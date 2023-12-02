const d = DeviceMotionEventAcceleration

const motionContainer = document.getElementById('motion-container')
let counter = 0
while (true) {
    

await new Promise((resolve)=>{
    setTimeout(()=>{
        motionContainer.innerHTML+= `<span> <b>X: </b>${d.x}</span>`
    motionContainer.innerHTML+= `<span> <b>Y: </b>${d.y}</span>`
    motionContainer.innerHTML+= `<span> <b>Z: </b>${d.z}</span>`
    
    },500)

    resolve()
})
if( counter > 200)
    break
else
    counter++

}
