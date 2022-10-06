
const fs = require('fs');
const path = require('path');

class Contenedor {

    constructor(nameJson) {
        this.nameJson = nameJson;
    }

getFile = async ()  => {
    const data = await fs.promises.readFile(`./${this.nameJson}`, 'utf-8')
    return JSON.parse(data)
}


    save = async (object) => {
       const copyProducts = await this.getFile()
            const newProduct = {
                title: object.title,
                price: object.price,
                id: copyProducts.length + 1
            };

            copyProducts.push(newProduct)
            fs.writeFile(`./${this.nameJson}`, JSON.stringify(copyProducts), (err)=> {
                if(err) throw err;
                console.log('agregado!')
            })

    }

    getAll = async () => {
        const data = await this.getFile();
        return data
    }


    getById = async (number) => {
        const data =  await this.getFile()
        const index = data.find((element)=>element.id === number);
        if(index !== undefined){
        return index

        }
        else{
            return console.log(`El producto con id ${number} no existe en nuestra base de datos` )
        }
        }
    

    deleteById = async (number) => {
       const data = await this.getFile()
            const products = data.filter((element) => {
                if (element.id !== number) {
                    return element
                }
            })
            fs.writeFile(`./${this.nameJson}`, JSON.stringify(products), (err) => {
                if (err) throw console.log(`No hay un producto con el id ${number}`);
           
            })

    }

    deleteAll = () => {
        const data = []
        fs.writeFile(`./${this.nameJson}`, JSON.stringify(data), (err) => {
            if (err) throw err;
        })
    }

}





const contenedor1 = new Contenedor('productos.JSON')




contenedor1.getAll().then((res)=>console.log(res))






