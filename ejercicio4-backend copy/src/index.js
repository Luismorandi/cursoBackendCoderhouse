
const Server = require('./services/server')
const puerto = 8080;

Server.listen(puerto, ()=>{
    console.log(`servidor listo escuchando en puerto ${puerto}`)
})

Server.on('error', (err)=>{
    console.log('Hubo un error en la conexion al servidor', err);
})
