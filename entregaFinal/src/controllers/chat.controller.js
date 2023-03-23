import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Chat {


    goToChat = async (req, res) => {
        const ruta = `public`
        console.log(ruta)
        return res.sendFile('register.html', { root: ruta })
    }
}
export default Chat