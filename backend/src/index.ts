import colors from 'colors';
import server from './server'
import Config from "./config/config";


server.listen(Config.PORT, () => {
    console.log( colors.blue.italic(`Servidor Funcionando en el puerto: ${Config.PORT} `))
})
