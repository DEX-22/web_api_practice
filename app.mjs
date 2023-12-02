const d = DeviceMotionEventAcceleration

const motionContainer = document.getElementById('motion-container')


motionContainer.innerHTML+= `<span> <b>X: </b>${d.x}</span>`
motionContainer.innerHTML+= `<span> <b>Y: </b>${d.y}</span>`
motionContainer.innerHTML+= `<span> <b>Z: </b>${d.z}</span>`
